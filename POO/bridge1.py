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

class FIFOQueue(ABC):
    @abstractmethod
    def enqueue(self, o):
        pass
    
    @abstractmethod
    def dequeue(self):
        return None
    
    @abstractmethod
    def is_empty(self):
        return True
    
    @abstractmethod
    def size(self):
        return 0

class ArrayListQueue(FIFOQueue):
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

class VectorQueue(FIFOQueue):
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

queue_from_list = Queue(list_queue)
queue_from_vector = Queue(vector_queue)

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
