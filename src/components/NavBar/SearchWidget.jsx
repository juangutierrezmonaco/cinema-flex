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
        openedRef.current.classList.remove('slide-in-left');
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
        if (open) { // Si está abierto
            // Hago visible el div
            openedRef.current.classList.remove('slide-out-right');
            openedRef.current.classList.remove('hidden');
            openedRef.current.classList.add('slide-in-left');

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
            <div className="searchContainerOverlay py-5 px-4 text-xs xs:text-sm sm:text-xl sm:px-10 md:text-xl md:py-2 xl:text-xl hidden" ref={openedRef}>
                <div className="searchContainer text-black">

                    <input type="search" placeholder="INGRESA TU BÚSQUEDA" className="searchContainer_input" ref={inputRef} onChange={submitBusqueda}/>

                    <div className={btnStyles}>
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <div className={btnStyles} onClick={closeSearcher}>
                        <button><i className="fa-solid fa-xmark"></i></button>
                    </div>

                </div>

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