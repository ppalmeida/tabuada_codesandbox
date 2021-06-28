import React, { FC } from "react";

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
  return (
    <tr style={{ padding: "8px" }}>
      <td style={{ minWidth: "150px" }}>Questão {name})</td>
      {direction === DIRECT_MATH && (
        <>
          <td>{base}</td>
          <td>*</td>
          <td>
            {times}
            <span> = </span>
          </td>
        </>
      )}
      {direction === RESULT_OVER_BASE && (
        <>
          <td>{result}</td>
          <td>/</td>
          <td>
            {base}
            <span> = </span>
          </td>
        </>
      )}
      {direction === RESULT_OVER_TIMES && (
        <>
          <td>{result}</td>
          <td>/</td>
          <td>
            {times}
            <span> = </span>
          </td>
        </>
      )}
      <td>{children}</td>
      <td>{error?.message}</td>
    </tr>
  );
};

export default TimesTableRow;
