import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('address.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY NOT NULL, title TEXT NO NULL, image TEXT NOT NULL)',
                [],
                () => resolve(),
                (_, err) => reject(err)
            )
        })
    })

    return promise;
}

export const insertAddress = (title, image) => {
    const promise = new Promise((resolve, reject)=> {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO address (title, image) VALUES (?, ?)',
                [title, image, ],
                (_, result) => {
                    console.log(result);
                    resolve(result)
                },
                (_, err) => {
                    console.log(err);
                    reject(err)
                }
            )
        })

    })

    return promise;
}

export const getAddress = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM address',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })}
    )

    return promise;
}