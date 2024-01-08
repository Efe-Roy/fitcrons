import React from 'react'

const NutritionFact = ({memData, results}) => {
  return (
    <React.Fragment>
        <h1 className="sm:text-lg text-sm font-bold title-font text-center text-white mt-10">DATOS NUTRICIONALES</h1>
        <div className="flex flex-col my-4 md:flex-row">

            <div className="flex flex-col px-3 md:w-1/2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-1">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-1">
                        <div className="overflow-hidden">
                            <table className="min-w-full border text-center text-sm font-light text-white dark:border-neutral-500">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr className='border-b'>
                                        <th scope="col" colSpan={5} className="px-6 py-4">CALORÍAS</th>
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
                                            ACTUALES
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-1 py-4 dark:border-neutral-500">
                                            MANTENIMIENTO
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-1 py-4 dark:border-neutral-500">
                                            REDUCCIÓN
                                        </th>
                                        <th scope="col" className="px-1 py-4">AUMENTO</th>
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
                                            {memData?.MembershipData?.calories}
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
                                        <th scope="col" colSpan={5} className="px-6 py-4">INGESTA BASE RECOMENDADA</th>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            PROTEÍNA
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            GRASA
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            CARBOS
                                        </th>
                                        <th
                                            scope="col"
                                            className="border-r px-6 py-4 dark:border-neutral-500">
                                            FIBRA
                                        </th>
                                        <th scope="col" className="px-6 py-4">AGUA</th>
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