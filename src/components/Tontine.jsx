import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tontine.css';

const Tontine = () => {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState('');
    const [pairs, setPairs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddMember = () => {
        const trimmed = newMember.trim();
        if (trimmed && !members.includes(trimmed)) {
            setMembers([...members, trimmed]);
            setNewMember('');
        }
    };

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
            if (shuffledMembers[i + 1]) {
                newPairs.push([shuffledMembers[i], shuffledMembers[i + 1]]);
            } else {
                newPairs.push([shuffledMembers[i], '—']);
            }
        }
        setPairs(newPairs);
    };

    const handleGenerate = () => {
        setIsLoading(true);
        setTimeout(() => {
            generatePairs();
            setIsLoading(false);
        }, 2000);
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
        <div className="container py-4">
            <div className="row">
                {/* Bloc 1 : Formulaire & Instructions */}
                <div className="col-md-4 mb-4">
                    <div className="p-4 shadow-sm rounded">
                        <h6>Amical des Anciens Servants Sainte Monique Makèpe</h6>
                        <h4 className="fw-bold mt-3">Ajouter un membre</h4>
                        <div className="d-flex mb-3">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Nom du membre"
                                value={newMember}
                                onChange={(e) => setNewMember(e.target.value)}
                            /> &nbsp;
                            <button className="btn btn-success" onClick={handleAddMember}>Ajouter</button>
                        </div>

                        {members.length > 0 && (
                            <>
                                <h5 className="fw-bold mt-4">Liste des membres</h5>
                                <ul className="list-group mb-3">
                                    {members.map((name, idx) => (
                                        <li key={idx} className="list-group-item">{name}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <button
                            onClick={handleGenerate}
                            className="btn btn-primary w-100"
                            disabled={isLoading || members.length < 2}
                        >
                            {isLoading ? 'Chargement...' : 'Générer les positions'}
                        </button>
                    </div>
                </div>

                {/* Bloc 2 : Affichage des Paires */}
                <div className="col-md-8 mb-4 rows">
                    <div className="pair-container">
                        {isLoading ? (
                            <div className="text-center my-5">
                                <div className="spinner-border text-primary" role="status" />
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
