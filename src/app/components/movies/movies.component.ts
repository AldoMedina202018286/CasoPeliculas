import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgForm } from '@angular/forms';

import { Movie } from '../../models/movies.model';
import {HttpDataService} from "../../services/http-data.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [
    { id:'1', title: 'Pelicula 1', duration: 115, genre: 'suspense' },
    { id:'2', title: 'Pelicula 2', duration: 176, genre: 'action' },
    { id:'3', title: 'Pelicula 3', duration: 125, genre: 'romance' },
  ];

  movieData!: Movie;
  // dataSource = new MatTableDataSource();
  dataSource: MatTableDataSource<Movie>;
  displayedColumns: string[] = ['id', 'title', 'duration', 'genre', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  selectedMovie: Movie | null = null;

  constructor() {
    this.dataSource = new MatTableDataSource<Movie>(this.movies);
  }

  /*constructor(private httpDataService: HttpDataService) {
    this.movieData = { } as Movie;
  }*/

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.getAllMovies();
  }

  /*getAllMovies() {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }*/

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
