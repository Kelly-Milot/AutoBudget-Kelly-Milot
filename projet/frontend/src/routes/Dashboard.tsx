import { useEffect, useState } from "react";
import movementsData from "../assets/data.json";
import { useParams } from "react-router-dom";
import { getAmountByYear } from "../utils/fiscal";
import { getSavingCapacityPrediction } from "../utils/prediction";
import { AnalyseByMonth, getAnalyse } from "../utils/analyse";

const Dashboard = () => {
    const [fiscal, setFiscal] = useState<number | null>(null);
    const [saving, setSaving] = useState<number | null>(null);
    const [analyse, setAnalyse] = useState<AnalyseByMonth>({});
    const [error, setError] = useState<string | null>(null);

    const { year, month } = useParams();

    const currentDate = new Date();
    const selectYear = parseInt(year ?? currentDate.getFullYear().toString());
    const actualYearMonth = year + '-' + month;

    useEffect(() => {
        try {
            setAnalyse(getAnalyse(movementsData)[actualYearMonth])
            setFiscal(getAmountByYear(movementsData, selectYear));
            setSaving(getSavingCapacityPrediction(movementsData, actualYearMonth))
        } catch (error) {
            setError('Erreur !');
        }
    })

    return (
        <>
            <h2 data-cy="page-title">Dashboard</h2>

            {error ? <p data-cy="error">{ error }</p> :
                <>
                    <h3>Totaux</h3>
                    <ul>
                        <li>Revenus fiscal annuels : <span data-cy="fiscal">{fiscal}</span></li>
                        <li>Prévision d'épargne : <span data-cy="saving">{saving}</span></li>
                    </ul>
                    <h3>Analyse</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th>Montant</th>
                                <th>Pourcentage</th>
                                <th>Mouvements</th>
                            </tr>
                        </thead>
                        <tbody data-cy="analyse">
                            {Object.keys(analyse).map((category) => (
                                <tr key={category}>
                                    <td>{category}</td>
                                    <td>{analyse[category].amount}€</td>
                                    <td>{analyse[category].percent}%</td>
                                    <td>{analyse[category].elements}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}

export default Dashboard;