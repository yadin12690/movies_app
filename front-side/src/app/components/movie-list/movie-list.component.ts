import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Movie } from 'src/app/model/Movie';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  Movie: any = [];
  editForm: FormGroup;
  dataSource: any=[];
  displayedColumns: string[] = ['index', 'createdAt', 'name', 'rating', 'pageUrl','likes'];

  @Input() likes: boolean;

  constructor(private apiService: ApiService, public fb: FormBuilder,private _snackBar: MatSnackBar) {
    this.readMovie();
  }

  ngOnInit() { }

  readMovie() {
    this.apiService.getMovies().subscribe((data) => {
      // console.log(data);
      this.Movie = data;
      this.dataSource=data;
      console.log(this.dataSource);
    })
  }

  removeMovie(movie, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteMovie(movie._id).subscribe((data) => {
        this.Movie.splice(index, 1);
        this._snackBar.open("Movie removed 🎥","",{
          duration: 2500,
        })
      }
      )
    }
  }


  toggleLike(movie, index) {
    // this.likesCount += (this.isActive) ? -1 : 1;
    
    console.log("movie:" + this.Movie[index]);
    this.Movie[index].likes = !this.Movie[index].likes;

    this.apiService.likeAMovie(movie._id, {likes: this.Movie[index].likes})
      .subscribe(res => {
        console.log('Likes updated successfully!')
      }, (error) => {
        console.log(error)
      })
  }

  formattedDate(date) {
    return moment(date).format("DD/MM/YYYY HH:mm:ss")
  }

}
