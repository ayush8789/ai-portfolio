import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const skills = [
    { name: "Python", level: 85 },
    { name: "Machine Learning", level: 80 },
    { name: "Deep Learning", level: 70 },
    { name: "FastAPI", level: 75 },
    { name: "React", level: 65 },
  ];

  const accuracyData = {
    labels: ["Sentiment Model"],
    datasets: [
      {
        label: "Model Accuracy (%)",
        data: [92],
        backgroundColor: "rgba(59,130,246,0.8)",
      },
    ],
  };

  return (
    <section id="dashboard" className="w-full flex justify-center">
      <div className="glass-card neon-border hover-lift w-full max-w-4xl p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          AI Systems Dashboard
        </h2>

        {/* Skills */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-300">
            Technical Capabilities
          </h3>

          {skills.map((skill, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between mb-2 text-gray-300">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Model Performance */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-300">
            Model Performance
          </h3>

          <Bar data={accuracyData} />
        </div>
      </div>
    </section>
  );
}