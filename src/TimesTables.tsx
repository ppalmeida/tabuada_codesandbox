import React, { FC, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
  if (rndDirection > 0.4 && rndDirection <= 0.9) {
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
  const [correctAnswers, updateCorrectAnswers] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setError
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

  const onSubmit = useCallback(
    (data) => {
      let countErrors = 0;
      Object.keys(data).forEach((field) => {
        const correctAnswer = allData.find((d) => d.id === field);
        if (data[field] !== correctAnswer?.answer.toString()) {
          setError(`${field}` as const, {
            type: "manual",
            message: `Resultado inválido! Resposta correta seria: ${correctAnswer?.answer}`
          });
          countErrors++;
        }
      });
      updateCorrectAnswers(numQuestions - countErrors);
    },
    [allData, setError, numQuestions]
  );

  if (allData.length === 0) {
    return null;
  }

  return (
    <div>
      <h4>Você está fazendo: Tabuada do {base}</h4>
      <form
        style={{ maxWidth: "90vw", display: "block" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <table>
          <thead></thead>
          <tbody>
            {allData.map((field, index) => {
              return (
                <TimesTableRow
                  error={errors[field.id]}
                  {...allData[index]}
                  key={field.id}
                >
                  <input
                    data-result={field.result}
                    type="number"
                    defaultValue=""
                    {...register(`${field.id}` as const, {
                      required: false
                    })}
                    disabled={isSubmitted && Boolean(errors[field.id])}
                  />
                </TimesTableRow>
              );
            })}
          </tbody>
        </table>
        <button type="submit">Verificar</button>
        {isSubmitted && (
          <div>
            <h5>Você acertou {correctAnswers} questões</h5>
            <p>
              Isso significa uma nota{" "}
              {Math.round((correctAnswers / numQuestions) * 100) / 10}
            </p>
            {correctAnswers === numQuestions && (
              <h3>
                Você pode se candidatar e ganhar 5 Euros!!! Fale com seu gestor
                e participe do Desafio dos 5 Euros!!
              </h3>
            )}
          </div>
        )}
      </form>
      <br />
      <button onClick={resetCache}>Resetar Questões</button>
    </div>
  );
};

export default TimesTable;
