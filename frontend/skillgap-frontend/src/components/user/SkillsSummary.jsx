import React from 'react'
import {Layers,Clock,CheckCircle,XCircle} from "lucide-react";

const SummaryCard=({title,value,icon,color})=>(
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
        <div className={`p-3 rounded-lg text-white ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);
const SkillsSummary = ({summary}) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-4">Skills Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
                title="Toatal Applications"
                value={summary.total_applications}
                icon={<Layers />}
                color="bg-indigo-600"
            />

            <SummaryCard
                title="Approved Applications"
                value={summary.approved_applications}
                icon={<CheckCircle />}
                color="bg-green-600"
            />

            <SummaryCard
                title="Pending Applications"
                value={summary.pending_applications}
                icon={<Clock />}
                color="bg-yellow-600"
            />

            <SummaryCard
                title="Rejected Applications"
                value={summary.rejected_applications}
                icon={<XCircle />}
                color="bg-red-600"
            />
        </div>
      </div>
    </>
  )
}

export default SkillsSummary
