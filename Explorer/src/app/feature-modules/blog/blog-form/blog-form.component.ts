import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog, BlogSystemStatus } from '../model/blog.model';
import { toArray } from 'rxjs';
import { TourAuthoringService } from '../../tour-authoring/tour-authoring.service';
import { TourEquipment } from '../../tour-authoring/model/tour_equipment';
import { PagedResult } from '../shared/model/paged-result.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Equipment } from '../../administration/model/equipment.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'xp-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})

export class BlogFormComponent implements OnChanges, OnInit {

  @Output() blogUpdated = new EventEmitter<null>();
  @Input() selectedBlog: Blog;

  constructor(private blogService: BlogService, private tourAuthoringService: TourAuthoringService) { }

  blogForm = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    creationDate: new FormControl(''),
    imageLinks: new FormControl(''),
    status: new FormControl(''),
  });

  displayedColumns: string[] = ['select', 'name', 'description'];
  allEquipment: Equipment[];
  selection = new SelectionModel<any>(true, []);

  ngOnChanges(changes: SimpleChanges): void {
        const blog = {
      title: this.selectedBlog.title,
      description: this.selectedBlog.description,
      creationDate: this.selectedBlog.creationDate,
      imageLinks: this.selectedBlog.imageLinks.toString(),
      systemStatus: this.selectedBlog.systemStatus || ""
    }
    this.blogForm.patchValue(blog);
  }

  ngOnInit(){
    this.tourAuthoringService.getEquipment().subscribe((res: PagedResults<Equipment>)=> {
      this.allEquipment = res.results;
    })
  }

  addBlog(): void {
    const blog: Blog = {
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: new Date().toISOString().split('T')[0] as string,
      imageLinks: this.blogForm.value.imageLinks?.split('\n') as string[],
      systemStatus: this.blogForm.value.status as BlogSystemStatus || ""
    }

    //this.refactorNewline(blog);
    this.addEquipment(blog);

    this.blogService.addBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }

  addEquipment(blog: Blog): void {
    const equipment = this.getCheckedItems();
    if(equipment.length > 0)
    {
      blog.description += "\n\n**Equipment I used for my tour:**"
      equipment.forEach(eq =>{
        blog.description += "\n- " + eq.name + ": " + eq.description;
      })
    } 
  }

  updateBlog(): void {
    const blog: Blog = {
      id: this.selectedBlog.id,
      title: this.blogForm.value.title || "",
      description: this.blogForm.value.description || "",
      creationDate: this.selectedBlog.creationDate as string,
      imageLinks: this.selectedBlog.imageLinks,
      systemStatus: this.blogForm.value.status as BlogSystemStatus
    }
    if(this.blogForm.value.imageLinks?.length != 1)
    {
      blog.imageLinks = this.blogForm.value.imageLinks?.split(',') as unknown as string[];
    }
    else
    {
      blog.imageLinks = this.blogForm.value.imageLinks as unknown as string[];
    }


    this.refactorNewline(blog);

    this.blogService.updateBlog(blog).subscribe({
      next: (_) => {
        this.blogUpdated.emit();
      }
    });
  }

  private refactorNewline(b: Blog) {
    b.description = b.description.replaceAll('\n', '<br>');
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.allEquipment.forEach(row => {
        //console.log(row);
        this.selection.select(row)
      });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allEquipment.length;
    return numSelected === numRows;
  }

  toggleCheckbox(row: any) {
    this.selection.toggle(row);
    this.getCheckedItems();
  }

  getCheckedItems(): Equipment[] {
    return this.selection.selected;
  }
}
