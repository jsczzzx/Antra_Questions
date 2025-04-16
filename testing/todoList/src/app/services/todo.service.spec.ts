import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../interfaces/todo.model';
import { of } from 'rxjs';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;

  const mockTodos: Todo[] = [
    { userId: 1, id: 1, title: 'New Item1', completed: false },
    { userId: 3, id: 2, title: 'New Item2', completed: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and reverse todos on getTodos()', () => {
    service.getTodos().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockTodos);
    });
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);

    service.todos$.subscribe((data)=>{
      expect(data.length).toBe(2);
      expect(data[0]).toEqual(mockTodos[1]);
    })
  });

  it('add todos on addTodos()', ()=>{
    (service as any).todos = [...mockTodos];
    (service as any).todosSubject$.next([...mockTodos]);

    const newTodo: Todo = {userId: 4, id: 3, title: 'New Item3', completed: false};
    service.addTodo(newTodo).subscribe((data) => {
      expect(data).toEqual(newTodo);
      
    })
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('POST');
    req.flush(newTodo);

    service.todos$.subscribe((data) => {
      expect(data.length).toBe(3);
      expect(data[0]).toEqual(newTodo);
    })
  })

  it('delete todo by id on deleteTodo()', ()=>{
    (service as any).todos = [...mockTodos];
    (service as any).todosSubject$.next([...mockTodos]);

    const idToDelete = '2';
    service.deleteTodo(idToDelete).subscribe((data)=>{
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/todos/${idToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    service.todos$.subscribe((data)=>{
      expect(data.length).toBe(1);
      expect(data[0].id).toBe(1);
    })
  })



});
