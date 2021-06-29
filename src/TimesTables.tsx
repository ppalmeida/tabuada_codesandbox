import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { FC, useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import TimesTableRow, {
  DIRECT_MATH,
  Question,
  RESULT_OVER_BASE,
  RESULT_OVER_TIMES
} from "./TimesTableRow";

const generateTimeTablesData = (base: number, index = 0): Question => {
  let times: number = Math.random() * 10;
  times = parseInt((times + 1).toString(), 10);

  const rndDirection = Math.random();
  let direction = DIRECT_MATH;
  if (rndDirection > 0.7 && rndDirection <= 0.9) {
    direction = RESULT_OVER_BASE;
  }
  if (rndDirection > 0.9) {
    direction = RESULT_OVER_TIMES;
  }

  const question: Question = {
    base,
    times,
    result: base * times,
    answer: -1,
    direction,
    name: index.toString(),
    id: `question_${index}`
  };

  if (direction === DIRECT_MATH) {
    question.answer = question.result;
  }
  if (direction === RESULT_OVER_BASE) {
    question.answer = times;
  }
  if (direction === RESULT_OVER_TIMES) {
    question.answer = base;
  }

  return question;
};

export interface TimesTableProps {
  base: number;
  numQuestions?: number;
}

const TimesTable: FC<TimesTableProps> = ({ base, numQuestions = 50 }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    control
  } = useForm({
    mode: "onSubmit",
    shouldUseNativeValidation: false,
    reValidateMode: "onSubmit"
  });
  const cacheKey = `timesTables_${base}`;

  const resetCache = () => {
    if (window) window.localStorage.removeItem(cacheKey);
  };

  const allData: Array<Question> = useMemo<Array<Question>>(() => {
    const cache = window && window.localStorage.getItem(cacheKey);
    let data: Array<Question> = cache ? JSON.parse(cache) : [];

    if (data?.length !== numQuestions) {
      data = [];
      for (let i = 0; i < numQuestions; i++) {
        const question = generateTimeTablesData(base, i);
        data.push(question);
      }
    }

    window.localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  }, [base, cacheKey, numQuestions]);

  const correctAnswers = numQuestions - Object.keys(errors).length;

  const onSubmit = useCallback((data) => {}, [numQuestions, errors]);

  if (allData.length === 0) {
    return null;
  }

  return (
    <Box width="100%">
      <h4>Você está fazendo: Tabuada do {base}</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" width="100%">
          {allData.map((field, index) => {
            return (
              <TimesTableRow
                error={errors[field.id]}
                {...allData[index]}
                key={field.id}
              >
                <Controller
                  render={({
                    field: { onChange, ref, onBlur, name },
                    fieldState: { invalid, error }
                  }) => {
                    return (
                      <TextField
                        type="number"
                        disabled={isSubmitted && invalid}
                        placeholder="Digite sua resposta"
                        label={null}
                        onChange={onChange}
                        onBlur={onBlur}
                        variant="outlined"
                        error={invalid}
                        helperText={invalid ? error?.message : null}
                        name={name}
                        inputRef={ref}
                        fullWidth
                      />
                    );
                  }}
                  name={`${field.id}` as const}
                  control={control}
                  rules={{
                    validate: (value) =>
                      value !== field.answer.toString()
                        ? `Ooooppss! Valor correto: ${field.answer}`
                        : undefined
                  }}
                />
              </TimesTableRow>
            );
          })}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="32px"
        >
          <Box width="60%">
            <Button
              size="large"
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
            >
              Verificar
            </Button>
          </Box>
        </Box>
        {isSubmitted && (
          <Box marginTop="32px">
            <Typography variant="h4" color="primary" align="center">
              Você acertou {correctAnswers} questões
            </Typography>
            <Typography variant="body1" align="center">
              Em uma nota de <strong>0 a 10</strong>, isso significa uma nota{" "}
              <strong>
                {Math.round((correctAnswers / numQuestions) * 100) / 10}
              </strong>
            </Typography>
            {correctAnswers === numQuestions && (
              <Box marginTop="32px">
                <Typography variant="h5" color="primary" align="center">
                  Você pode se candidatar e ganhar até 20 Euros!!! Fale com seu
                  gestor e participe do <strong>"Desafio dos 20 Euros"</strong>
                  !!
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </form>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="64px"
        marginBottom="64px"
      >
        <Button variant="outlined" onClick={resetCache}>
          Resetar Questões
        </Button>
      </Box>
    </Box>
  );
};

export default TimesTable;
