import { Movie } from './../../model/Movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movieId = null;
  submitted = false;
  editForm: FormGroup;
  movieData: Movie[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {

    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      rating: [1, [Validators.required]],
      pageUrl: ['', [Validators.required]],
      likes: [false]
    })

  }

  ngOnInit() {
    this.movieId = this.actRoute.snapshot.paramMap.get('id');
    if (this.movieId)
      this.getMovie(this.movieId);

  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getMovie(id) {
    this.apiService.getMovie(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        rating: data['rating'],
        pageUrl: data['pageUrl'],
        likes: data['likes'],
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {

        if (this.movieId) {
          this.apiService.updateMovie(this.movieId, this.editForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/movies-list');
              console.log('Content updated successfully!')
            }, (error) => {
              console.log(error)
            })
        }
        else {
          this.apiService.createMovie(this.editForm.value).subscribe(
            (res) => {
              console.log('Movie successfully created!')
              this.router.navigateByUrl('/movies-list')
            }, (error) => {
              console.log(error);
            });
        }
      }
    }
  }

}