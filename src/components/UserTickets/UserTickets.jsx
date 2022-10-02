import { useEffect, useState } from 'react'
import { scrollTo } from '../Utils/functions'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
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
                orderBy("fechaDeEmision", "desc"),
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
        if (user.id) {
            scrollTo('main');

            getUserTickets()
                .then(res => {
                    setUserTickets(res);
                    setLoading(false);
                })
                .catch(err => console.log(err));
        }
    }, [user])

    // En caso de que se ponga la ruta en el navegador, no se rompe la página
    const { isLogged } = useUser();

    return (
        <div>
            {isLogged ?
                <div className='flex flex-col items-centermb-7 pb-10'>
                    {!loading ?
                        <div className='flex flex-col items-center'>
                            <h1 className="text text-4xl uppercase mb-14 underline font-bowlby "> Mis tickets </h1>
                            <ul className='userTickets'>
                                {userTickets.map(ticket => (
                                    <li key={ticket.id}>
                                        <UserTicket {...ticket} />
                                    </li>
                                ))}
                            </ul>

                            {userTickets.length == 0 && <div className='text-center font-albert text-xl'>Aún no ha comprado ninguna entrada</div>}
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