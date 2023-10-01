import React,{ FC } from "react"
import './style.scss'

const LOW_COLOUR = "#DB3A34"
const MED_COLOUR = "#FFC857"
const HIGH_COLOUR = "#52b788"
const EMPTY_COLOUR = "#e9ecef"

const getCenter =  (size: number) => size / 2
const getRadius = (center: number, strokeWidth: number) => center - strokeWidth


const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0 // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage
}

type Props = {
  percentage: number
  size: number
  strokeWidth: number
}

const getColour = (percentage?: number) => {
  if (!percentage) {
    return EMPTY_COLOUR
  }

  if (percentage < 33.33) {
    return LOW_COLOUR
  }

  return percentage < 66.66 ? MED_COLOUR : HIGH_COLOUR
}

const Circle = ({ percentage, size, strokeWidth }: Props) => {
  const center = getCenter(size)
  const r = getRadius(center, strokeWidth)
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - (percentage)) * circ) / 100
  const colour = getColour(percentage)

  return (
    <circle
      r={r}
      cx={size/2}
      cy={size/2}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  )
}

const Text = ({ percentage, size }: Partial<Props>) => {
  return (
    <text
      x={size ? size/2 : 0}
      y={size ? size/2 : 0}
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"smaller"}
    >
      {percentage?.toFixed(0)}%
    </text>
  )
}

const Pie: FC<Props> = ({ percentage, strokeWidth, size }) => {
  const pct = cleanPercentage(percentage)
  return (
    <svg width={size} height={size}>
      <g transform={`rotate(-90 ${size/2} ${size/2})`}>
        <Circle percentage={0} strokeWidth={strokeWidth} size={size} />
        <Circle percentage={pct} strokeWidth={strokeWidth} size={size} />
      </g>
      {/* <Text percentage={pct} size={size} /> */}
    </svg>
  )
}

export default Pie
