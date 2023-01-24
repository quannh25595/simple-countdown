import { useState } from 'react';
import Form from './Form'
import Countdown from './Countdown'

const App: React.FC = () => {
    const [showForm, setShowForm] = useState(true);
    const [trainingSeconds, setTrainingSeconds] = useState(0);
    const [restSeconds, setRestSeconds] = useState(0);

    const handleSubmit = (trainingTime: number, restTime: number) => {
        setTrainingSeconds(trainingTime);
        setRestSeconds(restTime);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(true);
        setTrainingSeconds(0);
        setRestSeconds(0);
    };

    return (
        <div>
            {showForm ? (
                <Form onSubmit={handleSubmit} />
            ) : (
                <Countdown
                    trainingSeconds={trainingSeconds}
                    restSeconds={restSeconds}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};


export default App;
