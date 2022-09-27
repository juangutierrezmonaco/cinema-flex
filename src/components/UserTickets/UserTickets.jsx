import { useEffect, useState } from 'react'
import { scrollTo } from '../global/functions'
import { collection, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { useUser } from '../../context/UserContext';
import UserTicket from './UserTicket';
import Loader from '../Loader/Loader'

const UserTickets = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);

    const [userTickets, setUserTickets] = useState([]);
    const getUserTickets = () => {
        return new Promise((resolve, reject) => {
            const db = getFirestore();
            const q = query(
                collection(db, "orders"),
                where('userId', '==', user.id)
            );

            getDocs(q)
                .then(res => {
                    if (res.size == 0) {
                        console.log('Sin resultados');
                        resolve([]);
                    } else {
                        const resp = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        resolve(resp);
                    }
                })
                .catch(error => reject(error));
        });
    }

    useEffect(() => {
        scrollTo('main');

        getUserTickets()
            .then(res => {
                setUserTickets(res);
                console.log(res);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [user])

    // En caso de que se ponga la ruta en el navegador, no se rompe la página
    const { isLogged } = useUser();

    return (
        <div>
            {isLogged ?
                <div className='bg-white text-black px-36 py-10 flex flex-col items-center border w-full'>
                    {!loading ?
                        <div>
                            <h1 className="text-5xl uppercase mb-10 text-center"> Mis entradas </h1>
                            <ul className='userTickets'>
                                {userTickets.map(ticket => (
                                    <li key={ticket.id}>
                                        <UserTicket {...ticket} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        <Loader />
                    }
                </div>
                :
                <h1 className='text-center text-2xl'>Debe estar loggeado para poder ver sus tickets</h1>
            }
        </div>
    )
}

export default UserTickets;