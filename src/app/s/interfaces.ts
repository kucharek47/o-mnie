export interface UrlProjektu {
  Front?: string;
  Backend?: string;
  Efekt?: string;
  [key: string]: string | undefined;
}

export interface Projekt {
  tytul: string;
  opis: string;
  path: string;
  url: UrlProjektu | UrlProjektu[] | string;
}

export interface KategoriaRaw {
  info: string;
  path: string;
  projekty: Projekt[];
}

export interface Kategoria extends KategoriaRaw {
  nazwa: string;
  projekty: Projekt[];
}
export interface LinkItem {
  nazwa: string;
  link: string;
  git: boolean;
}
