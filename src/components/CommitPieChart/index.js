import {PieChart, Pie, Cell, Legend} from 'recharts'

const COLORS = ['#54CA76', '#31A4E6', '#F5C452', '#F2637F', '#9261F3']

const CommitPieChart = props => {
  const {analysisData} = props
  const {langCommitCount} = analysisData
  const langCommitData = Object.entries(
    langCommitCount,
  ).map(([language, count]) => ({language, count}))
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={langCommitData}
        outerRadius={100}
        innerRadius={58}
        dataKey="count"
        nameKey="language"
        cx={100}
      >
        {langCommitData.map((entry, index) => (
          <Cell key={entry.language} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="middle"
        wrapperStyle={{right: 20}}
        itemStyle={{marginBottom: '20px'}}
        iconSize={18}
      />
    </PieChart>
  )
}
export default CommitPieChart
