import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Movie, MoviesDTO } from '../../types/movie'
import { map } from 'rxjs'
import { VideoDTO } from '../../types/video'

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private api_url = 'https://api.themoviedb.org/3'
  private api_key = '60dc3814ec88818f2a6b586ca2c952f5'
  private movie_language = 'pt-BR'

  constructor(private http: HttpClient) {}

  getMoviesByType(type: string, count = 20) {
    return this.http
      .get<MoviesDTO>(
        `${this.api_url}/movie/${type}?api_key=${this.api_key}&language=${this.movie_language}`
      )
      .pipe(map((response) => response.results.slice(0, count)))
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(
      `${this.api_url}/movie/${id}?api_key=${this.api_key}&language=${this.movie_language}`
    );
  }

  getMovieVideos(id: string) {
    return this.http.get<VideoDTO>(
      `${this.api_url}/movie/${id}/videos?api_key=${this.api_key}&language=${this.movie_language}`
    )
    .pipe(map((response) => response.results));
  }
}