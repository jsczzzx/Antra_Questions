import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.todoitem = { userId: 3, id: 2, title: 'New Item2', completed: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title', () => {
    const spanElement = fixture.nativeElement.querySelector('span');
    expect(spanElement.innerText).toEqual('New Item2');
  })

  it('should emit event on buttonClick', () => {
    spyOn(component.todoIdEmiter, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();
  
    expect(component.todoIdEmiter.emit).toHaveBeenCalledOnceWith(2);
  }) 
});
