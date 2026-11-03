"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatEUR, formatEURRounded } from "@/lib/format";

// Chart theme (§9.9): fixed series order black → yellow → grey → light grey.
// Yellow and light grey always get a 1px black stroke (non-text contrast ≥ 3:1 on white).
export const series = [
  { fill: "var(--color-chart-1)", stroke: "var(--color-chart-1)" },
  { fill: "var(--color-chart-2)", stroke: "var(--color-black)" },
  { fill: "var(--color-chart-3)", stroke: "var(--color-chart-3)" },
  { fill: "var(--color-chart-4)", stroke: "var(--color-black)" },
] as const;

const axisTick = {
  fontFamily: "var(--font-ui)",
  fontSize: 12,
  fill: "var(--color-neutral-600)",
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-white)",
    border: "1px solid var(--color-neutral-200)",
    borderRadius: 6,
    boxShadow: "0 8px 24px -8px rgb(0 0 0 / .12)",
    fontFamily: "var(--font-ui)",
    fontSize: 13,
  },
  labelStyle: { color: "var(--color-black)", fontWeight: 600 },
  cursor: { fill: "var(--color-neutral-50)" },
};

/* ───── Horizontal price bars, sorted, values in cents ───── */

export function PriceBarChart({
  data,
  highlight,
}: {
  data: { label: string; cents: number }[];
  highlight?: string;
}) {
  const sorted = [...data].sort((a, b) => a.cents - b.cents);
  return (
    <BarChart
      responsive
      layout="vertical"
      data={sorted}
      margin={{ top: 0, right: 72, bottom: 0, left: 0 }}
      style={{ width: "100%", height: Math.max(160, sorted.length * 44) }}
    >
      <CartesianGrid horizontal={false} stroke="var(--color-neutral-200)" />
      <XAxis
        type="number"
        tick={axisTick}
        tickFormatter={(v: number) => formatEURRounded(v)}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        type="category"
        dataKey="label"
        width={128}
        tick={{ ...axisTick, fill: "var(--color-black)", fontSize: 13 }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip
        {...tooltipStyle}
        formatter={(v) => [formatEUR(Number(v)), "pro Monat (netto)"]}
      />
      <Bar dataKey="cents" barSize={20} radius={[0, 2, 2, 0]}>
        {sorted.map((d) => {
          const s = d.label === highlight ? series[1] : series[0];
          return (
            <Cell
              key={d.label}
              fill={s.fill}
              stroke={s.stroke}
              strokeWidth={1}
            />
          );
        })}
        <LabelList
          dataKey="cents"
          position="right"
          formatter={(v) => formatEUR(Number(v))}
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            fontWeight: 600,
            fill: "var(--color-black)",
          }}
        />
      </Bar>
    </BarChart>
  );
}

/* ───── Price history: step lines (prices change in steps) ───── */

export function PriceHistoryChart({
  data,
  lines,
}: {
  data: Record<string, string | number>[];
  lines: { key: string; label: string }[];
}) {
  return (
    <LineChart
      responsive
      data={data}
      margin={{ top: 8, right: 24, bottom: 0, left: 0 }}
      style={{ width: "100%", height: 280 }}
    >
      <CartesianGrid vertical={false} stroke="var(--color-neutral-200)" />
      <XAxis dataKey="date" tick={axisTick} axisLine={false} tickLine={false} />
      <YAxis
        tick={axisTick}
        tickFormatter={(v: number) => formatEURRounded(v)}
        axisLine={false}
        tickLine={false}
        width={64}
      />
      <Tooltip
        {...tooltipStyle}
        cursor={{ stroke: "var(--color-neutral-300)" }}
        formatter={(v, name) => [formatEUR(Number(v)), name]}
      />
      {lines.flatMap((line, i) => {
        const yellow = i === 1;
        const main = (
          <Line
            key={line.key}
            type="stepAfter"
            dataKey={line.key}
            name={line.label}
            stroke={series[i]?.fill}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, stroke: "var(--color-black)", strokeWidth: 1 }}
            isAnimationActive={!yellow}
          />
        );
        // A yellow line alone is too faint on white: draw it on a black casing.
        return yellow
          ? [
              <Line
                key={`${line.key}-kontur`}
                type="stepAfter"
                dataKey={line.key}
                stroke="var(--color-black)"
                strokeWidth={4.5}
                dot={false}
                activeDot={false}
                legendType="none"
                tooltipType="none"
                isAnimationActive={false}
              />,
              main,
            ]
          : [main];
      })}
    </LineChart>
  );
}

/* ───── Cost curve: monthly cost by team size, two tools (A black, B yellow) ───── */

export function CostCurveChart({
  data,
  a,
  b,
  unitLabel,
  marker,
  breakEven,
}: {
  data: { units: number; a: number | null; b: number | null }[];
  a: string;
  b: string;
  unitLabel: string;
  marker?: number;
  breakEven?: number;
}) {
  return (
    <LineChart
      responsive
      data={data}
      margin={{ top: 16, right: 24, bottom: 8, left: 0 }}
      style={{ width: "100%", height: 320 }}
    >
      <CartesianGrid vertical={false} stroke="var(--color-neutral-200)" />
      <XAxis
        dataKey="units"
        type="number"
        domain={["dataMin", "dataMax"]}
        tick={axisTick}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v: number) => `${v}`}
        label={{
          value: unitLabel,
          position: "insideBottomRight",
          offset: -4,
          style: axisTick,
        }}
      />
      <YAxis
        tick={axisTick}
        tickFormatter={(v: number) => formatEURRounded(v)}
        axisLine={false}
        tickLine={false}
        width={72}
      />
      <Tooltip
        {...tooltipStyle}
        cursor={{ stroke: "var(--color-neutral-300)" }}
        labelFormatter={(v) => `${v} ${unitLabel}`}
        formatter={(v, name) => [
          v == null ? "Auf Anfrage" : formatEUR(Number(v)),
          name,
        ]}
      />
      {breakEven != null && (
        <ReferenceLine
          x={breakEven}
          stroke="var(--color-black)"
          strokeDasharray="4 4"
          label={{
            value: `Break-even: ${breakEven}`,
            position: "top",
            style: { ...axisTick, fill: "var(--color-black)" },
          }}
        />
      )}
      {marker != null && (
        <ReferenceLine x={marker} stroke="var(--color-neutral-400)" />
      )}
      <Line
        type="linear"
        dataKey="a"
        name={a}
        stroke="var(--color-chart-1)"
        strokeWidth={2.5}
        dot={false}
        connectNulls={false}
      />
      <Line
        type="linear"
        dataKey="b"
        stroke="var(--color-black)"
        strokeWidth={4.5}
        dot={false}
        legendType="none"
        tooltipType="none"
        isAnimationActive={false}
        connectNulls={false}
      />
      <Line
        type="linear"
        dataKey="b"
        name={b}
        stroke="var(--color-chart-2)"
        strokeWidth={2.5}
        dot={false}
        isAnimationActive={false}
        connectNulls={false}
      />
    </LineChart>
  );
}
