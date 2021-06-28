import Box from "@material-ui/core/Box";
import { createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FC } from "react";

export const DIRECT_MATH = "DIRECT_MATH";
export const RESULT_OVER_BASE = "RESULT_OVER_BASE";
export const RESULT_OVER_TIMES = "RESULT_OVER_TIMES";

export interface Question {
  base: number;
  times: number;
  result: number;
  answer: number;
  direction: string;
  name: string;
  id: string;
}

const useStyles = makeStyles(({ spacing, breakpoints, palette }: Theme) =>
  createStyles({
    root: {
      borderColor: palette.grey[400],
      borderRadius: "4px",
      border: "1px solid",
      marginBottom: spacing(2),
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      padding: spacing(1)
    }
  })
);

const TimesTableRow: FC<
  Question & { touched?: boolean; error?: { message?: string } }
> = ({
  base,
  times,
  result,
  direction,
  name,
  children,
  touched = false,
  error = undefined
}) => {
  const styles = useStyles();
  return (
    <Box className={styles.root}>
      <Box padding="4px" marginLeft="8px">
        <Typography>{parseInt(name, 10) + 1})</Typography>
      </Box>
      <Box padding="4px" marginLeft="8px">
        {direction === DIRECT_MATH && (
          <Typography>{`${base} * ${times} = `}</Typography>
        )}
        {direction === RESULT_OVER_BASE && (
          <Typography>{`${result} / ${base} = `}</Typography>
        )}
        {direction === RESULT_OVER_TIMES && (
          <Typography>{`${result} / ${times} = `}</Typography>
        )}
      </Box>
      <Box padding="4px" marginLeft="8px" flexGrow={1}>
        {children}
      </Box>
    </Box>
  );
};

export default TimesTableRow;
