import {Component, signal, computed, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {toSignal} from '@angular/core/rxjs-interop';
import {pobieranie_danych} from './s/dane';
import { Kategoria, Projekt, LinkItem } from './s/interfaces';
import { WyskakujaceUrl } from './wyskakujace-url/wyskakujace-url';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, WyskakujaceUrl],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private dane_s = inject(pobieranie_danych);

  kategorie:any = toSignal(this.dane_s.pobierz(), { initialValue: [] as Kategoria[] });

  widok:any = signal<"kategorie" | "projekty">("kategorie");
  aktywna_kategoria:any = signal(null);
  index:any = signal(0);
  wysuwane_otwarte:any = signal(false);
  okno_otwarte:any = signal(false);

  elementy_rotacji = computed(() => {
    if (this.widok() === "kategorie") {
      return this.kategorie();
    } else {
      return this.aktywna_kategoria()?.projekty || [];
    }
  });

  wybrany_element = computed(() => {
    const items = this.elementy_rotacji();
    if (!items.length) return null;
    const safeIndex = (this.index() % items.length + items.length) % items.length;
    return items[safeIndex];
  });

  dostepneLinki = computed<LinkItem[]>(() => {
    const item = this.wybrany_element();
    if (!item || !('url' in item)) return [];

    const urls = (item as Projekt).url;
    const wyniki: LinkItem[] = [];
    const git_url = (url_tmp: string) => url_tmp.includes('github.com');

    if (typeof urls === "string") {
      if (urls) wyniki.push({ nazwa: "Link do projektu", link: urls, git: git_url(urls) });
    } else if (Array.isArray(urls)) {
      urls.forEach(obj => {
        Object.entries(obj).forEach(([key, val]) => {
          if (val) wyniki.push({ nazwa: key, link: val, git: git_url(val) });
        });
      });
    } else if (typeof urls === "object") {
      Object.entries(urls).forEach(([key, val]) => {
        if (typeof val === "string" && val) {
          wyniki.push({ nazwa: key, link: val, git: git_url(val) });
        }
      });
    }
    return wyniki;
  });

  formatuj_tekst(tekst: string): string {
    if (!tekst) return '';
    return tekst.replace(/\^(.*?)\^/g, '<b>$1</b>');
  }

  przesuniecie(kierunek: -1 | 1) {
    let wielkosc = this.elementy_rotacji().length
    if (wielkosc === 0) return
    let wynik = this.index() + kierunek
    if (wynik < 0) {
      wynik = wielkosc - 1
    }
    if (wynik >= wielkosc) {
      wynik = 0
    }
    this.index.set(wynik)
  }

  wybierz_element(m: number) {
    if (m === this.index()) {
      this.wejdz_w();
    } else {
      this.index.set(m);
    }
  }

  wejdz_w() {
    if (this.widok() === "kategorie") {
      const wybrana = this.wybrany_element() as Kategoria;
      if (wybrana && wybrana.projekty && wybrana.projekty.length > 0) {
        this.aktywna_kategoria.set(wybrana);
        this.widok.set("projekty");
        this.index.set(0);
      }
    } else {
      this.okno_otwarte.set(true);
    }
  }

  cofnij() {
    if (this.widok() === "projekty") {
      this.widok.set("kategorie");
      this.aktywna_kategoria.set(null);
      this.index.set(0);
    }
  }

  wl_wyl() {
    this.wysuwane_otwarte.update((v: any) => !v);
  }

  tytul_slownik(item: Kategoria | Projekt | null): string {
    if (!item) return '';
    return 'nazwa' in item ? (item as Kategoria).nazwa : (item as Projekt).tytul;
  }

  opis_slownik(item: Kategoria | Projekt | null): string {
    if (!item) return '';
    return 'info' in item ? (item as Kategoria).info : (item as Projekt).opis;
  }

  zdj_slownik(item: Kategoria | Projekt | null): string {
    if (!item) return 'img/cv.png';
    return item.path || 'img/cv.png';
  }

  url_slownik(item: Kategoria | Projekt | null): any {
    if (!item) return null;
    return 'url' in item ? (item as Projekt).url : null;
  }

  private touchStartX = 0;
  private touchEndX = 0;

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const threshold = 50;
    if (this.touchEndX < this.touchStartX - threshold) this.przesuniecie(1);
    if (this.touchEndX > this.touchStartX + threshold) this.przesuniecie(-1);
  }
}
