import {PieChart, Pie, Cell} from 'recharts'
import './index.css'

const COLORS = [
  '#54CA76',
  '#31A4E6',
  '#F5C452',
  '#F2637F',
  '#9261F3',
  '#FFA500',
  '#FF69B4',
  '#8A2BE2',
  '#00CED1',
  '#FF4500',
]

const CommitRepoPie = props => {
  const {analysisData} = props
  const {repoCommitCount} = analysisData
  console.log(repoCommitCount)

  const repoCommitData = Object.entries(
    repoCommitCount,
  ).map(([name, value]) => ({name, value}))

  return (
    <div className="repo-container">
      <div className="pie-container">
        <PieChart width={400} height={300}>
          <Pie
            data={repoCommitData}
            outerRadius={100}
            innerRadius={58}
            dataKey="value"
            nameKey="name"
          >
            {repoCommitData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <ul className="repo-commit-list">
        {repoCommitData.map((eachData, index) => (
          <li
            key={eachData.name}
            className="repo-item"
            style={{'--repo-color': COLORS[index % COLORS.length]}}
          >
            <span className="color-box" />
            {eachData.name} ({eachData.value})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommitRepoPie
