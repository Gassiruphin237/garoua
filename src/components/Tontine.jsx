import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tontine.css';

const Tontine = () => {
    const [members] = useState([
        'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah',
        'Ivy', 'Jack', 'Kevin', 'Laura', 'Mason', 'Nina', 'Oliver', 'Paul',
        'Quincy', 'Rita', 'Sam', 'Tina'
    ]);

    const [pairs, setPairs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const generatePairs = () => {
        const shuffledMembers = shuffleArray(members);
        const newPairs = [];
        for (let i = 0; i < shuffledMembers.length; i += 2) {
            newPairs.push([shuffledMembers[i], shuffledMembers[i + 1]]);
        }
        setPairs(newPairs);
    };

    const handleGenerate = () => {
        setIsLoading(true);
        setTimeout(() => {
            generatePairs();
            setIsLoading(false);
        }, 10000);
    };

    const groupPairs = () => {
        const grouped = [];
        for (let i = 0; i < pairs.length; i += 3) {
            grouped.push(pairs.slice(i, i + 3));
        }
        return grouped;
    };

    const getSecondSaturday = (year, month) => {
        const firstDay = new Date(year, month, 1);
        const firstDayOfWeek = firstDay.getDay();
        const offset = (6 - firstDayOfWeek + 7) % 7;
        const secondSaturday = new Date(year, month, 1 + offset + 7);
        return secondSaturday;
    };

    return (
        <div className="container">
            <div className="row">
                {/* Bloc 1 : Instructions */}
                <div className="col-md-4 mb-4">
                    <div className="p-4 shadow-sm rounded">
                        <h6> Amical des Anciens Servants Sainte Monique Makèpe</h6><br/>
                        <strong><h3>Instruction</h3></strong>
                        <p>Cliquez sur le bouton ci-dessous pour générer les positions de reception la Tontine.</p>
                        <button onClick={handleGenerate} className="btn btn-primary btn-lg w-100" disabled={isLoading}>
                            {isLoading ? 'Chargement...' : 'Générer les positions'}
                        </button>
                    </div>
                </div>

                {/* Bloc 2 : Affichage des Paires */}
                <div className="col-md-8 mb-4 rows">
                    <div className="pair-container">
                        {isLoading ? (
                            <div className="text-center my-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Chargement...</span>
                                </div>
                                <p className="mt-2">Génération en cours...</p>
                            </div>
                        ) : pairs.length > 0 ? (
                            groupPairs().map((group, groupIndex) => (
                                <div key={groupIndex} className="d-flex gap-3 mb-4">
                                    {group.map((pair, pairIndex) => {
                                        const meetingIndex = groupIndex * 3 + pairIndex;
                                        const baseMonth = 4; // Mai
                                        const date = getSecondSaturday(2025, baseMonth + meetingIndex);
                                        const formattedDate = date.toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        });

                                        return (
                                            <div key={pairIndex} className="pair shadow-sm rounded p-3">
                                                <span className="fw-bold">N° {groupIndex * 3 + pairIndex + 1}</span>
                                                <div>{pair[0]} et {pair[1]}</div>
                                                <div className="text-muted mt-2">Réunion le : {formattedDate}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                        ) : (
                            <p>Aucune paire générée.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tontine;
