from abc import ABC, abstractmethod

class Queue(ABC):
    def __init__(self, fifo_queue):
        self.fifo_queue = fifo_queue
    
    def enqueue(self, o):
        self.fifo_queue.enqueue(o)
    
    def dequeue(self):
        return self.fifo_queue.dequeue()
    
    def is_empty(self):
        return self.fifo_queue.is_empty()
    
    def size(self):
        return self.fifo_queue.size()    
    
class List(ABC):
    def __init__(self, element, index):
        self.element
        self.index
        self.items = []

    def add(self, element):
        self.items.append(element)
    
    def remove(self, index):
        for i in items:
            if i == index:
                self.items.pop(i)


class ArrayListQueue(Queue):
    def __init__(self):
        self.items = []
    
    def enqueue(self, o):
        self.items.append(o)
    
    def dequeue(self):
        if not self.items:
            print("Erro, pilha vazia!")
        return self.items.pop(0)
    
    def is_empty(self):
        if len(self.items) == 0:
            print("Lista vazio")
        else:
            print("Lista com elementos")
    
    def size(self):
        return len(self.items)

class VectorQueue(Queue):
    def __init__(self):
        self.items = []
    
    def enqueue(self, o):
        self.items.append(o)
    
    def dequeue(self):
        if not self.items:
            print("Erro, pilha vazia!")
        return self.items.pop(0)
    
    def is_empty(self):
        if len(self.items) == 0:
            print("Vetor vazio")
        else:
            print("Vetor com elementos")
    
    def size(self):
        return len(self.items)

# Instanciação
list_queue = ArrayListQueue()
vector_queue = VectorQueue()

queue_from_list = List(list_queue)
queue_from_vector = List(vector_queue)

queue_from_list.is_empty()
queue_from_list.enqueue(10)
queue_from_list.is_empty()
queue_from_list.enqueue(45)
queue_from_vector.enqueue("Fabio")
queue_from_vector.enqueue("Musa")
queue_from_vector.enqueue("Sergio")

# Removendo elementos
print(f"Saindo da lista: {queue_from_list.dequeue()}") 
print(f"Saindo do vetor: {queue_from_vector.dequeue()}")  
