import { Component, OnInit } from '@angular/core';
import {ProjectsInforComponent} from '../projects-infor.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../../../../system/project_module/project';
import {ProjectSystem} from '../../../../system/project_module/project_system';

class MemberInfo {
  constructor(public id: number,
              public name: string,
              public gender: string,
              public role: string,
              public email: string,
              public contact: string,
              public status: string,
              public free: string,
  ) {}
}

class MemberTask {
  constructor(public id: number,
              public name: string,
              public role: string,
              public sum_tasks: number,
              public unstart_tasks: number,
              public started_tasks: number,
              public finished_tasks: number,
              public progress: number,
              public total: boolean = false,
  ) {}
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  ProjectSystem = ProjectSystem;
  father = ProjectsInforComponent;

  constructor(private project: ProjectSystem,
              private router_info: ActivatedRoute,
              private router:Router) {
    // 当路由发生变化，存储在浏览器里面的的用户信息发生变化的时候刷新组件
    router.events.subscribe(this.updateProject.bind(this));
  }

  project_obj: Project;

  member_infos: MemberInfo[] = [
    new MemberInfo(1,"利俊安","男", '项目经理 前端人员 后端人员',
      "804173948@qq.com","QQ 804173948", "在线", "否"),
    new MemberInfo(2,"李光耀","男", '后端人员',
      "123456789@qq.com","QQ 1169969860", "离线", "否"),
    new MemberInfo(6,"吴宁","男", '测试经理 后端人员',
      "1010101010@qq.com","", "在线", "是"),
    new MemberInfo(3,"张景维","男", '前端人员',
      "4645678678@qq.com","", "在线", "否"),
    new MemberInfo(4,"邹博韬","男", '前端人员',
      "boruto@scut.edu","17701941369", "离线", "否"),
    new MemberInfo(5,"曾声云","男", '测试人员',
      "xingyun6@xingyun6.com","", "离线", "否")
  ];

  member_tasks: MemberTask[] = [
    new MemberTask(1,'利俊安','项目经理 前端人员 后端人员',50,
      5,25,20,40),
    new MemberTask(2,'李光耀','后端人员',8,
      1,2,5,62.5),
    new MemberTask(6,'吴宁','测试经理 后端人员',33,
      11,0,22,66.67),
    new MemberTask(3,'邹博韬','前端人员',24,
      9,3,12,50),
    new MemberTask(4,'张景维','前端人员',40,
      2,2,36,90),
    new MemberTask(5,'曾声云','测试人员',16,
      10,4,2,12.5),
    new MemberTask(0,'总计','-',100, 20,
      28,52,52, true),
  ];

  ngOnInit() {
    this.updateProject();
  }

  updateProject() {
    this.project_obj = ProjectSystem.Project;
    let pid = this.router_info.snapshot.params['id'];
    if(this.project_obj && this.project_obj.id == pid) return;
    this.project.getProject(pid).subscribe(this.setProject.bind(this));
  }

  setProject(proj) {
    this.project_obj=proj;
  }

  generateMemberData() {

  }

  format(x: number) {
    return Math.max(Math.min(Math.round(x*100)/100, 100),0);
  }

  taskClassNameFilter(row: any, index: number): string {
    return row.total ? 'green_row bold_row' : '';
  }
  infoClassNameFilter(row: any, index: number): string {
    return row.status=='在线' ? 'green_row' : '';
  }

  onInfoDetail(scope) {
    console.info("onDetail",{scope});
  }
  onTaskDetail(scope) {
    console.info("onDetail",{scope});
  }
  onDelete(scope) {
    console.info("onDelete",{scope});
  }
  onAssign(scope) {
    console.info("onDelete",{scope});
  }

}
