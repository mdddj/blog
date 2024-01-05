
// To parse this data:
//
//   import { Convert, CategoryResult } from "./file";
//
//   const categoryResult = Convert.toCategoryResult(json);

import {Tag} from "@/models/blog";

export interface CategoryResult {
    archiveModels: ArchiveModel[];
    blogCount:     number;
    cateCount:     number;
    categoryList:  CategoryList[];
    monthsCounts:  MonthsCount[];
    tagCount:      number;
    tags:          Tag[];
}

export interface ArchiveModel {
    blogs:  BlogCategory[];
    count:  number;
    months: string;
}

export interface BlogCategory {
    createTime: Date;
    id:         number;
    title:      string;
}

export interface CategoryList {
    createTime: Date;
    id:         number;
    intro:      string;
    logo:       string;
    name:       string;
}

export interface MonthsCount {
    count:  number;
    months: string;
}

