import React from 'react'

const NutritionFact = ({memData, results}) => {
  return (
    <React.Fragment>
        <h1 className="sm:text-lg text-sm font-bold title-font text-center text-white mt-10">NUTRITIONAL FACTS</h1>
        <div className="flex flex-col my-4 md:flex-row">

            <div className="flex flex-col px-3 md:w-1/2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-1">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-1">
                        <div className="overflow-hidden">
                            <table className="min-w-full border text-center text-sm font-light text-white dark:border-neutral-500">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr className='border-b'>
                                        <th scope="col" colSpan={5} className="px-6 py-4">CALORIES</th>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-r px-1 py-4 dark:border-neutral-500">
                                            IMB
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-1 py-4 dark:border-neutral-500">
                                            CURRENT
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-1 py-4 dark:border-neutral-500">
                                            MAINTENANCE
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-1 py-4 dark:border-neutral-500">
                                            REDUCTION
                                        </th>
                                        <th scope="col" className="px-1 py-4">INCREASE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td
                                            className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                            {Math.ceil(results?.bmr)}
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                            {memData?.calories}
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                            {Math.ceil(results?.maintenance)}
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-r px-1 py-4 dark:border-neutral-500">
                                            {Math.ceil(results?.reduction)}
                                        </td>
                                        <td className="whitespace-nowrap px-1 py-4">{Math.ceil(results?.increase)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-3 md:w-1/2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-1">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-1">
                        <div className="overflow-hidden">
                            <table className="min-w-full border text-center text-sm font-light text-white dark:border-neutral-500">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr className='border-b'>
                                        <th scope="col" colSpan={5} className="px-6 py-4">RECOMMENDED BASE INTAKE</th>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            PROTEIN
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            GREASE
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            CARBS
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            FIBRE
                                        </th>
                                        <th scope="col" className="px-6 py-4">WATER</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                        <td
                                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                            {Math.ceil(results?.recommendedProtein)}
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                            {Math.ceil(results?.recommendedFats)}
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                            {Math.ceil(results?.recommendedCarbs)}
                                        </td>
                                        <td
                                            className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                                            {Math.ceil(results?.recommendedFiber)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">{results?.recommendedWater}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </React.Fragment>
  )
}

export default NutritionFact