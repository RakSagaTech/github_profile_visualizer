import {PieChart, Pie, Cell, Legend} from 'recharts'

const COLORS = ['#54CA76', '#31A4E6', '#F5C452', '#F2637F', '#9261F3']

const RepositoryPie = props => {
  const {languages} = props
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={languages}
        outerRadius={100}
        innerRadius={58}
        dataKey="count"
        cx={100}
      >
        {languages.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="middle"
        wrapperStyle={{right: 60}}
        iconSize={14}
      />
    </PieChart>
  )
}
export default RepositoryPie
