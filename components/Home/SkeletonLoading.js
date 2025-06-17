import React from 'react'

function SkeletonLoading() {
    return (
        <div className="flex p-3 ml-3 border border-gray-300 rounded-md mb-3 shadow-sm bg-white animate-pulse">
            {/* Image Placeholder */}
            <div className="rounded-md bg-slate-200 h-[150px] w-[170px]"></div>

            {/* Text Content Placeholder */}
            <div className="ml-4 flex flex-col justify-between flex-1">
                <div className="space-y-3 py-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-slate-200 rounded-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-6"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonLoading
