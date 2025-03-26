import React from 'react';
import {InstantSearch, SearchBox, Hits, Highlight} from 'react-instantsearch';
import {instantMeiliSearch} from '@meilisearch/instant-meilisearch';
import {closeDialogModal, showDialogModal} from "@/tools/fun";
import "instantsearch.css/themes/algolia-min.css";
import {Link} from "@@/exports";

const {searchClient} = instantMeiliSearch(
    'https://search.itbug.shop',
    '21e6bdff291cd3beec0e8b852d6b164b3cf07a4b13d796a538f89dc3d91b4767'
);

// @ts-ignore
const Hit = ({hit}) => <p>
    <Link to={`/detail/${hit.id}`} onClick={()=>{
closeDialogModal("my_search_box")
    }} className="link link-hover break-all break-words">
        <Highlight hit={hit} attribute={"title"}>
            {hit.title}
        </Highlight>
    </Link>

</p>;

const SearchComponent = () => {
    return <InstantSearch
        indexName={'blogs'}
        searchClient={searchClient}
    >
        <SearchBox/>
        <Hits hitComponent={Hit}/>
    </InstantSearch>
}


const SearchButton: React.FC = () => {

    return <span className={'items-center hidden lg:flex'}>
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