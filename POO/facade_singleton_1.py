class Curso:
    def __init__(self, nome):
        self.nome = nome

    def getNome(self):
        return self.nome


class Aluno:
    def __init__(self, matricula, nome):
        self.matricula = matricula
        self.nome = nome

    def getNome(self):
        return self.nome

    def getMatricula(self):
        return self.matricula


class Turma:
    def __init__(self):
        self.alunos = []
        self.curso = None

    def setCurso(self, curso):
        self.curso = curso

    def addAluno(self, aluno):
        self.alunos.append(aluno)


class Faculdade:
    def __init__(self):
        self.cursos = {}
        self.alunos = {}

    def getCurso(self, codigo):
        return self.cursos.get(codigo)

    def getAluno(self, codigo):
        return self.alunos.get(codigo)


# Singleton
class MatriculaGUI:

    # Parte do Façade
    # def __init__(self, escola):
    #     self.escola = escola

    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.faculdade = kwargs.get('faculdade')
        return cls._instance

    def matricular(self, codAluno, codCurso, turma):
        aluno = self.faculdade.getAluno(codAluno)
        curso = self.faculdade.getCurso(codCurso)

        if aluno and curso:
            turma.setCurso(curso)
            turma.addAluno(aluno)
            print(aluno.getNome(), "foi matriculado na turma de ", curso.getNome())
        else:
            print("Aluno ou curso não encontrado :(")

    def exibirStatus(self, turma):
        curso = turma.curso
        alunos = turma.alunos

        print("\nCurso: ", curso.getNome())
        for aluno in alunos:
            print("[", aluno.getNome(), "-> Matrícula: ", aluno.getMatricula(), "]")


faculdade = Faculdade()

curso1 = Curso("Ciência da Computação")
curso2 = Curso("Engenharia da Computação")
curso3 = Curso("Matemática Computacional")

aluno1 = Aluno("148561", "Fabio")
aluno2 = Aluno("148751", "Musa")

turmaCCOMP = Turma()
turmaMATCOMP = Turma()

faculdade.cursos["1"] = curso1
faculdade.cursos["2"] = curso2
faculdade.alunos["148561"] = aluno1
faculdade.alunos["148751"] = aluno2

matricula_singleton = MatriculaGUI(faculdade=faculdade) 

matricula_singleton.matricular("148561", "2", turmaMATCOMP)
matricula_singleton.matricular("148751", "1", turmaCCOMP)

matricula_singleton.exibirStatus(turmaMATCOMP)
matricula_singleton.exibirStatus(turmaCCOMP)

