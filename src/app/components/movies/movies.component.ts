import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Movie } from '../../models/movies.model';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [
    { id:'1', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/jXbqfVHmvCikyTw2Lf5OhKyt9Ym.jpg', title: 'The Social Network', duration: 121, genre: 'Biography, Drama' },
    { id:'2', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg', title: 'The Wolf of Wall Street ', duration: 180, genre: 'Biography, Comedy, Crime, Drama' },
    { id:'3', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/ctjEj2xM32OvBXCq8zAdK3ZrsAj.jpg', title: 'Catch Me If You Can', duration: 141, genre: 'Biography, Crime, Drama' },
    { id:'4', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/tWsNYbrqy1p1w6K9zRk0mSchztT.jpg', title: 'Now You See Me', duration: 115, genre: 'Crime, Mystery, Thriller' },
    { id:'5', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/zqDopwg7XQ4IfFX2dRlQCT1SwMG.jpg', title: 'The Girl with the Dragon Tattoo', duration: 158, genre: 'Thriller, Crime, Mystery' },
  ];

  movieData!: Movie;
  // dataSource = new MatTableDataSource();
  dataSource: MatTableDataSource<Movie>;
  displayedColumns: string[] = ['id', 'poster', 'title', 'duration', 'genre', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  selectedMovie: Movie | null = null;

  constructor() {
    this.dataSource = new MatTableDataSource<Movie>(this.movies);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editMovie(id: string, movie: Movie) {
    const index = this.movies.findIndex(m => m.id === id);
    this.movies[index] = movie;
    this.dataSource.data = this.movies;
    this.selectedMovie = null;
  }

  deleteMovie(movie: Movie) {
    const index = this.movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.movies.splice(index, 1);
      this.dataSource.data = this.movies;
      this.selectedMovie = null;
    }
  }
}
