import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";

const SearchWidget = ({ btnStyles }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const [open, setOpen] = useState(false);
    const openSearcher = () => {
        setOpen(true);
    }

    const closeSearcher = () => {
        openedRef.current.classList.remove('slide-in-right');
        openedRef.current.classList.add('slide-out-right');
        setTimeout(() => {
            openedRef.current.classList.add('hidden');
            inputRef.current.value = '';
            setSearchTerm('');
            setOpen(false);
        }, 400);
    }

    const inputRef = useRef();
    useEffect(() => {
        if (open) { // Si está abuerto
            // Hago visible el div
            openedRef.current.classList.remove('slide-out-right');
            openedRef.current.classList.add('slide-in-right');
            openedRef.current.classList.remove('hidden');

            // Hago focus en el input
            inputRef.current.focus();
        }
    }, [open])

    const openedRef = useRef();
    const submitBusqueda = ({ target }) => {
        setSearchTerm(target.value);
    }    

    return (
        <div className="uppercase">
            <div className="searchContainerOverlay py-5 px-4 text-sm sm:text-xl sm:px-10 md:text-xl md:py-2 xl:text-xl hidden" ref={openedRef}>
                <form className="searchContainer text-black">

                    <input type="search" placeholder="INGRESA TU BÚSQUEDA" className="searchContainer_input" ref={inputRef} onChange={submitBusqueda}/>

                    <div className={btnStyles} onClick={openSearcher}>
                        <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <div className={btnStyles} onClick={closeSearcher}>
                        <button type="button"><i className="fa-solid fa-xmark"></i></button>
                    </div>

                </form>

                {searchTerm &&
                    <SearchDropdown searchTerm={searchTerm} close={closeSearcher}/>
                }

            </div>

            <div className={btnStyles} onClick={openSearcher} >
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
    )
}

export default SearchWidget;