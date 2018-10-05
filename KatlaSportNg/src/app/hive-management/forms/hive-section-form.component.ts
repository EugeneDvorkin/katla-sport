import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSection } from '../models/hive-section';
import { HiveSectionService } from '../services/hive-section.service';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0,"","",false);
  hiveId = 0;
  existed = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HiveSectionService
  ) { }  

  ngOnInit() {
    this.route.params.subscribe(p => {
            this.hiveId = p['id'];
            if(p['id'] === undefined) return;
            this.existed = true;
            this.service.getHiveSection(p['id']).subscribe(h => this.hiveSection = h);
          })
  }

  navigateToHiveSections(){
    this.router.navigate([`/hive/${this.hiveId}/sections`]);
  }
      
  onDelete(){
    this.service.setHiveSectionStatus(this.hiveSection.id, true).subscribe(x=> this.hiveSection.isDeleted = true);
  }
      
  onUndelete(){
    this.service.setHiveSectionStatus(this.hiveSection.id, false).subscribe(x=> this.hiveSection.isDeleted = false);
  }
      
  onPurge(){
    this.hiveSection = new HiveSection(0, "", "", false);
  }
      
  onSubmit() {
    if(this.existed){
      this.service.updateHiveSection(this.hiveSection, this.hiveId)
      .subscribe(x => this.navigateToHiveSections())
    }
    else{
      this.service.createHiveSection(this.hiveSection, this.hiveId)
      .subscribe(x => this.navigateToHiveSections());
    }    
  }

  onCancel() {
    this.navigateToHiveSections();
  }
}
