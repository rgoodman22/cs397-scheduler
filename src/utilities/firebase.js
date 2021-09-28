import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDjakRU4B_tO85ucVqK9Wl5hqbBSMKSAa4",
    authDomain: "rgoodman22-cs397-scheduler.firebaseapp.com",
    databaseURL: "https://rgoodman22-cs397-scheduler-default-rtdb.firebaseio.com",
    projectId: "rgoodman22-cs397-scheduler",
    storageBucket: "rgoodman22-cs397-scheduler.appspot.com",
    messagingSenderId: "416690190235",
    appId: "1:416690190235:web:b4b25cc7f60b0a33b9d33e"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);
