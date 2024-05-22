export interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data: T;
}


export interface PageResult<T> {
  list: T[];
  page: Pageable;
}

export interface Resource {
  authority:      null;
  browserUrl:     null;
  category:       Category;
  clickCount:     number;
  content:        string;
  createDate:     Date;
  description:    null;
  fileInfo:       null;
  id:             number;
  images:         FileInfo[];
  label:          null;
  links:          null;
  share:          null;
  thumbnailImage: null;
  title:          string;
  type:           string;
  updateDate:     Date;
  user:           User;
}

export interface Category {
  description:   string;
  fileInfo:      null;
  id:            number;
  level:         number;
  logo:          string;
  name:          string;
  resourceCount: null;
  type:          string;
}

export interface User {
  authorities:             Authority[];
  city:                    string;
  email:                   string;
  enterprise:              Enterprise | undefined;
  id:                      number;
  intro:                   null;
  isAccountNonExpired:     boolean;
  isAccountNonLocked:      boolean;
  isCredentialsNonExpired: boolean;
  isEnabled:               boolean;
  job:                     string;
  loginNumber:             string;
  loginTime:               Date;
  nickName:                string;
  openAiFlag:              boolean;
  openAiTokens:            null;
  phone:                   string;
  picture:                 string;
  relationId:              null;
  roles:                   Authority[];
  showName:                string;
  status:                  null;
  type:                    number;
  username:                string;
  vip:                     null;
  wallet:                  null;
}


export interface Enterprise {
  id:       number;
  isEnable: boolean;
  name:     string;
  phone:    string;
  profile:  string;
  qq:       string;
  wechat:   string;
}
export interface Authority {
  authority:   string;
  createDate:  Date;
  icon:        null;
  id:          number;
  name:        string;
  note:        string;
  permissions: any[];
  sort:        number;
  status:      null;
}

export interface Pageable {
  currentPage: number;
  hasPrevious: boolean;
  isPaged:     boolean;
  maxPage:     number;
  pageSize:    number;
  total:       number;
}


export interface FileInfo {
  absolutePath:     string;
  createDate:       Date;
  ext:              string;
  fileName:         string;
  fileSize:         number;
  fileType:         string;
  fullUrl:          string;
  height:           null;
  id:               number;
  intro:            string;
  isCollect:        boolean;
  isImage:          boolean;
  minioBucketName:  string;
  minioObjectName:  string;
  originalFilename: string;
  tagColor:         string;
  thumbnail:        string;
  thumbnailPath:    string;
  updateDate:       null;
  url:              string;
  width:            null;
}