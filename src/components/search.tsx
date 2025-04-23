import React from 'react';
import {InstantSearch, SearchBox, Hits, Highlight} from 'react-instantsearch';
import {instantMeiliSearch} from '@meilisearch/instant-meilisearch';
import {closeDialogModal, showDialogModal} from "@/tools/fun";
import "instantsearch.css/themes/algolia-min.css";
import {Link} from "@@/exports";

const {searchClient} = instantMeiliSearch(
    'https://search.itbug.shop',
    '7b8f1a8a2dd26a813b3ef7d3efad6aa89b348f295831b3c49087d5256d2fc5ca'
);

// @ts-ignore
const Hit = ({hit}) => <p>
    <Link to={`/detail/${hit.id}`} onClick={()=>{
closeDialogModal("my_search_box")
    }} className="link link-hover break-all break-words">
        <Highlight hit={hit} attribute={"title"}>
        
        </Highlight>
    </Link>

</p>;

const SearchComponent = () => {
    return <InstantSearch
        indexName={'blogs'}
        searchClient={searchClient}
    >
        <SearchBox/>
        <div className='h-5'></div>
        <Hits hitComponent={Hit} classNames={{item:"rounded"}}/>
    </InstantSearch>
}


const SearchButton: React.FC = () => {

    return <span className={'items-center hidden lg:flex '}>
        <button className={'btn btn-sm '} onClick={() => showDialogModal("my_search_box")}>🔍</button>
        <dialog id="my_search_box" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
                <h3 className="font-bold text-lg">搜索</h3>
                <p className="py-4">
                    <SearchComponent/>
                </p>
            </div>
            <form method="dialog" className="modal-backdrop"><button>close</button></form>
        </dialog>
    </span>
}

export {
    SearchButton
};