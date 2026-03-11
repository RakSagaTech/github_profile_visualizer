import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'

import './index.css'

const LinearChart = props => {
  const {analysisData} = props
  const {quarterCommitCount} = analysisData

  const convertData = Object.entries(quarterCommitCount).map(
    ([quarter, count]) => ({
      quarter,
      count,
    }),
  )
  return (
    <div className="line-chart-container">
      <LineChart
        width={1500}
        height={300}
        data={convertData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis
          dataKey="quarter"
          interval="preserveStart"
          padding={{left: 20, right: 0}}
          stroke="#3B82F6"
          tickLine={{strokeWidth: 2}}
          tickSize={14}
          dy={4}
          axisLine={{stroke: '#3B82F6', strokeWidth: 2}}
        />
        <YAxis
          stroke="#3B82F6"
          tickLine={{strokeWidth: 2}}
          tickSize={14}
          tick={{dx: -2.5}}
          axisLine={{stroke: '#3B82F6', strokeWidth: 2}}
        />
        <Tooltip cursor={{stroke: '#3B82F6', strokeWidth: 2}} />
        <Line
          type="linear"
          dataKey="count"
          stroke="#3B82F6"
          dot={{r: 4, stroke: '#3B82F6', fill: '#3B82F6'}}
        />
        {convertData.map(item => (
          <ReferenceLine
            key={item.quarter}
            x={item.quarter}
            stroke="#3B82F6"
            strokeDasharray="3 3"
          />
        ))}
      </LineChart>
      <h1 className="line-heading">Commit Count per Quarter</h1>
    </div>
  )
}

export default LinearChart
