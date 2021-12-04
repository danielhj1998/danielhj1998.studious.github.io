---
layout: note
---

# Programación concurrente
Primero se analizará un programa que implementa hilos para calcular la suma de todos los elementos de una matriz $N\times N$. El programa realiza lo siguiente:

1. Inicializa la matriz $N\times N$
2. Crea $N$ threads para calcular la suma de los elementos de 1 fila y almacena el valor en un arreglo
3. Une los threads y calcula la suma de los elementos del arreglo de suma.

```c
/**** C4.1.c file: compute matrix sum by threads ***/
/**
 * REF: Systems Programming in Unix/Linux, K.C. Wang, editorial 
 * Springer Nature, 2018. Chapter 4 Concurrent Programming, page 147.
 * ISBN: 978-3-319-92428-1 ISBN: 978-3-319-92429-8 (eBook).
 *
 *   gcc c4.1.c -pthread
 */
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <assert.h>

#define N 4
int A[N][N], sum[N];

void *func(void *arg) // threads function
{
  int j;
  long row;
  pthread_t tid = pthread_self();// get thread ID number
  row=(long)arg;
  printf("Thread %d [%lu] computes sum of row %d\n", row, tid, row);
  for (j=0; j<N; j++)            // compute sum of A[row]in global sum[row]
    sum[row] += A[row][j];
  printf("Thread %d [%lu] done: sum[%d] = %d\n",
          row, tid, row, sum[row]);
  pthread_exit((void*)0);        // thread exit: 0=normal termination
}/*end func()*/

int main (int argc, char *argv[])
{
  pthread_t thread[N]; // thread IDs
  long i;
  int j, r, total = 0;
  void *status;
  
  printf("Main: initialize A matrix\n");
  for (i=0; i<N; i++){
    sum[i] = 0;
    for (j=0; j<N; j++){
      A[i][j] = i*N + j + 1;
      printf("%4d ", A[i][j]);
    }
    printf("\n");
  }
  
  printf("Main: create %d threads\n", N);
  for(i=0; i<N; i++) {
    pthread_create(&thread[i], NULL, func, (void *)i);
  }
  
  printf("Main: try to join with threads\n");
  for(i=0; i<N; i++) {
    pthread_join(thread[i], &status);
    printf("Main: joined with %d [%lu]: status=%lu\n",
           i, thread[i], (long)status);
  }
  
  printf("Main: compute and print total sum: ");
  for (i=0; i<N; i++)
    total += sum[i];
  printf("total = %d\n", total);
  pthread_exit(NULL);
}/*end main()*/
```

Primero se define el tamaño de la matriz, el arreglo matricial y el arreglo de suma:

```c
#define N 4
int A[N][N], sum[N];
```

Iniciando con la función `main`, primero se declaran las variables necesarias:

```c
int main (int argc, char *argv[])
{
  pthread_t thread[N]; // thread IDs
  long i;
  int j, r, total = 0;
  void *status;
```

Luego se inicializa la matriz con ciertos valores iniciales diferentes de $0$ y el vector de suma en $0$s:

```c
  printf("Main: initialize A matrix\n");
  for (i=0; i<N; i++){
    sum[i] = 0;
    for (j=0; j<N; j++){
      A[i][j] = i*N + j + 1;
      printf("%4d ", A[i][j]);
    }
    printf("\n");
  }
```

Se crean los threads necesarios en el arreglo de `thread[]`, que van a ejecutar la función `func`, que se mostrará posteriormente, como argumento a dicha función se proporciona el número de fila como un [puntero a void](http://fpsalmon.usc.es/genp/doc/cursos/C++/punteros/void.html):

```c
  printf("Main: create %d threads\n", N);
  for(i=0; i<N; i++) {
    pthread_create(&thread[i], NULL, func, (void *)i);
  }
```

> La función `func`, se muestra a continuación:
> 
> ```c
> void *func(void *arg) // threads function
> {
>   int j;
>   long row;
>   pthread_t tid = pthread_self();// get thread ID number
>   row=(long)arg;
>   printf("Thread %d [%lu] computes sum of row %d\n", row, tid, row);
>   for (j=0; j<N; j++)            // compute sum of A[row]in global sum[row]
>     sum[row] += A[row][j];
>   printf("Thread %d [%lu] done: sum[%d] = %d\n",
>           row, tid, row, sum[row]);
>   pthread_exit((void*)0);        // thread exit: 0=normal termination
> }/*end func()*/
> ```
> 
> Dicha función tiene como valor de retorno un puntero a void y recibe como parámetro un número de fila de la matriz, imprime su id de thread y realiza la suma de los elementos de la fila correspondiente de la matriz y almacena el resultado en el vector de suma. Luego imprime la suma y retorna con `pthread_exit()` retornando $0$ si todo se ejecutó correctamente.

Luego se realiza la unión de los threads, esto significa esperar por la finalización de los hilos para continuar. Luego se imprime su estátus de retorno:

```c
  printf("Main: try to join with threads\n");
  for(i=0; i<N; i++) {
    pthread_join(thread[i], &status);
    printf("Main: joined with %d [%lu]: status=%lu\n",
           i, thread[i], (long)status);
  }
```

Finalmente se realiza la suma de los elementos en el vector de suma `sum[]` y se imprime el resultado:

```c
  printf("Main: compute and print total sum: ");
  for (i=0; i<N; i++)
    total += sum[i];
  printf("total = %d\n", total);
  pthread_exit(NULL);
}/*end main()*/
```

Compilando `gcc c4.1.c -pthread` y ejecutando el programa `./a.out`, se obtiene la siguiente salida:

```
Main: initialize A matrix
   1    2    3    4
   5    6    7    8
   9   10   11   12
  13   14   15   16
Main: create 4 threads
Thread 0 [140214514730752] computes sum of row 0
Thread 0 [140214514730752] done: sum[0] = 10
Main: try to join with threads
Thread 1 [140214506338048] computes sum of row 1
Thread 3 [140214489552640] computes sum of row 3
Thread 1 [140214506338048] done: sum[1] = 26
Thread 3 [140214489552640] done: sum[3] = 58
Thread 2 [140214497945344] computes sum of row 2
Thread 2 [140214497945344] done: sum[2] = 42
Main: joined with 0 [140214514730752]: status=0
Main: joined with 1 [140214506338048]: status=0
Main: joined with 2 [140214497945344]: status=0
Main: joined with 3 [140214489552640]: status=0
Main: compute and print total sum: total = 136
```

## Condiciones de carrera
Cuando se ejecutan varios hilos dentro de un proceso, estos comparten en el mismo espacio de direcciones de memoria y si en su programa modifican las mismas variables, pueden ocurrir fenómenos como **condiciones de carrera**, que es cuando el resultado de una operación, depende del orden de ejecución de los hilos.

Las condiciones de carrera en general se deben evitar, programando para intentar que sean inexistentes. En el caso del programa anterior, no ocurre esto porque al ser el resultado la suma, no importa el orden en que se terminaron de ejecutar.

## Sincronización de hilos
Al hacer operaciones con hilos, también es posible que estos necesiten cooperar entre sí, por se hacen necesarios mecanismos de sincronización y reglas de uso de datos compartidos.

### Mutex Locks
Los candados Mutex se llaman así por *Mutual Exclusion* y el mecanismo consiste en *bloquear* los datos de uso compartido mientras un hilo lo está utilizando. Cuando deja de utilizarlo, *desbloquea* el candado y otros hilos pueden intentar acceder a él.

`PThread` implementa los candados mutex de la siguiente forma:

1. Inicialización de variable `pthread_mutex_t`
    * `PTHREAD_MUTEX_INITIALIZER`: Inicialización de forma estática con los valores por defecto.

        ```c
        pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
        ```
        
    * `pthread_mutex_init(pthread_mutex_t *m,pthread_mutexattr_t *attr)`: Función inicializadora de mutex
    
        ```c
        pthread_mutex_init(mutex,NULL);
        ```
    
        > Es común utilizar `NULL` como `*attr` para que se implementen los atributos (configuraciones) por defecto.
2. Utilización de variables mutex

    ```c
    pthread_mutex_lock(&mutex);     //bloqueo de mutex
    mutex = ...                     //acceso a variable mutex
    pthread_mutex_unlock(&mutex);   //desbloqueo de mutex
    ```

    Cuando el hilo intenta bloquear el candado con `pthread_mutex_lock()`, si está disponible, se bloquea la variable, en caso de que no, se bloque al thread y se pone en la cola de espera del mutex.
3. Destrucción de las variables mutex

    ```c
    pthread_mutex_destroy(mutex);     //bloqueo de mutex
    pthread_mutex_exit(NULL);   //desbloqueo de mutex
    ```

Se conoce como **Región Crítica** (CR) a las ejecuciones que sólo pueden ser ejecutadas por 1 hilo a la vez.

En el ejemplo anterior las sumas de cada hilo, correspondientes a cada fila de la matriz, se almacenaban en su propia variable dentro del arreglo de suma `sum[]`, a continuación se muestra un ejemplo del mismo programa pero donde los hilos modifican todos a una variable global `total`:

```c
/** C4.3.c: matrix sum by threads with mutex lock **/
/**
 * REF: Systems Programming in Unix/Linux, K.C. Wang, editorial 
 * Springer Nature, 2018. Chapter 4 Concurrent Programming, page 152.
 * ISBN: 978-3-319-92428-1 ISBN: 978-3-319-92429-8 (eBook).
 */
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <assert.h>

#define N 4
int A[N][N];
int total = 0;        // global total
pthread_mutex_t *m;   // mutex pointer
void *func(void *arg) // working thread function
{
  int i,sum=0;
  long row;
  pthread_t tid = pthread_self(); // get thread ID number
  row=(long)arg;
  printf("Thread %d [%lu] computes sum of row %d\n", row, tid, row);
  for (i=0; i<N; i++)             // compute partial sum of A[row]in
    sum += A[row][i];
  printf("Thread %d [%lu] update total with %d : ", row, tid, sum);
  pthread_mutex_lock(m);
  total += sum;                   // update global total inside a CR
  pthread_mutex_unlock(m);
  printf("total = %d\n", total);
}

int main (int argc, char *argv[])
{
  pthread_t thread[N];
  long i;
  int j, r;
  int sum[N];
  void *status;
  printf("Main: initialize A matrix\n");
  for (i=0; i<N; i++){
    sum[i] = 0;
    for (j=0; j<N; j++){
      A[i][j] = i*N + j + 1;
      printf("%4d ", A[i][j]);
    }
    printf("\n");
  }
  // create a mutex m
  m = (pthread_mutex_t *)malloc(sizeof(pthread_mutex_t));
  pthread_mutex_init(m, NULL); // initialize mutex m
  printf("Main: create %d threads\n", N);
  for(i=0; i<N; i++) {
    pthread_create(&thread[i], NULL, func, (void *)i);
  }
  printf("Main: try to join with threads\n");
  for(i=0; i<N; i++) {
    pthread_join(thread[i], &status);
    printf("Main: joined with %d [%lu]: status=%lu\n",
           i, thread[i], (long)status);
  }
  printf("Main: total = %d\n", total);
  pthread_mutex_destroy(m); // destroy mutex m
  pthread_exit(NULL);
}/*end main()*/
```

#### Deadlocks
Al usar candados, pueden ocurrir problemas que impidan la correcta ejecución del programa. Un error muy común es el **deadlock** que ocurre cuando hilos o en el caso del kernel, procesos, se bloquean todos esperando a que el otro termine su tarea para poder continuar.

| Thread T1   | Thread T2   |
| :-          | :-          |
| `lock(m1);` | `lock(m2);` |
| `...`       | `...`       |
| `lock(m2)`  | `lock(m1)`  |

Ambos threads se bloquean mutuamente y no hay salida, esto es un deadlock.

Esto se debe evitar en la programación concurrente, pero también existen mecanismos de **detección**, **prevención** y **recuperación de deadlocks**:

* Peticiones de locking unidireccionales: Diseñar el algoritmo para que no haya peticiones de locking en ciclo, sin embargo esto no siempre es posible.
* `pthread_mutex_trylock()`: Función de locking condicional. Regresa un error si el mutex está bloqueado. Un hilo que reciba este error podría entonces liberar los locks que tiene para liberar otros hilos, hasta que obtenga acceso al mutex.
    
    ```c
    while(1){
        lock(m1);
        if (!trylock(m2)) // if trylock m2 falla
            unlock(m1);
        else
            break;
        // random delay
    }
    ```
    
#### Variables de condición
Para la colaboración entre hilos, se implementan **variables de condición** que permiten el bloqueo y desbloqueo de mutex entre hilos, por medio de condiciones. `PThread` las implementa de la siguiente forma:

1. Inicialización de variable `pthread_cond_t`
    * `PTHREAD_COND_INITIALIZER`: Inicialización de forma estática con los atributos por defecto.

        ```c
        pthread_cond_t condition = PTHREAD_COND_INITIALIZER;
        ```
        
    * `pthread_cond_init(pthread_cond_t *con,pthread_condattr_t *attr)`: Inicialización de forma dinámica.
    
        ```c
        pthread_cond_init(condition,NULL);
        ```
    
        > Es común utilizar `NULL` como `*attr` para que se implementen los atributos (configuraciones) por defecto.
2. Utilización de variables de condición

    ```c
    pthread_mutex_lock(&mutex);     //bloqueo de mutex
    mutex = ...                     //acceso a variable mutex
    //uso de variable de condición para esperar o comunicarse con otro(s) hilo(s)
    pthread_mutex_unlock(&mutex);   //desbloqueo de mutex
    ```
    
    Las funciones que pueden utilizar las variables de condición para interaccionar con otros hilos son las siguientes:

    * `pthread_cond_wait(condition,mutex)`: Bloquea el hilo que la utiliza hasta que se *señalice* la condición `condition`. Esta función debería ser utilizada mientras `mutex` está bloqueada, puesto que libera al `mutex` mientras esté esperando y cuando llega la señal en `condition`, desbloquea el hilo y bloquea a `mutex` de nuevo.
    * `pthread_cond_signal(condition)`: Señaliza (activa) una variable de condición que está siendo *esperada* (wait) en otro thread. Debería llamarse desde el hilo que ya terminó su operación con la variable `mutex`, para que el thread que espera continue.
    * `pthread_cond_broadcast(condition)`: Desbloquea todos los  hilos que están bloqueados en la variable de condición `condition`. Así, todos los hilos desbloqueados, competirán por la el `mutex`.

A continuación se muestra un ejemplo de *productor-consumidor* implementando mutex y variables de condición. Los buffers se implementan como buffers circulares.

```c
/* C4.4.c: producer-consumer by threads with condition variables */
/**
 * REF: Systems Programming in Unix/Linux, K.C. Wang, editorial 
 * Springer Nature, 2018. Chapter 4 Concurrent Programming, page 158.
 * ISBN: 978-3-319-92428-1 ISBN: 978-3-319-92429-8 (eBook).
 *
 *   gcc c4.4.c -pthread
 */
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define NBUF	5
#define N	10

// shared global variables
int buf[NBUF];                    // circular buffers
int head, tail;                   // indices
int data;                         // number of full buffers
pthread_mutex_t mutex;            // mutex lock
pthread_cond_t emptyBuf, fullBuf; // condition variables

int init()
{
  head = tail = data = 0;
  pthread_mutex_init(&mutex, NULL);
  pthread_cond_init(&fullBuf, NULL);
  pthread_cond_init(&emptyBuf, NULL);
}

void *producer()
{
  int i;
  pthread_t me = pthread_self();
  for (i=0; i<N; i++){              // try to put N items into buf[ ]
    pthread_mutex_lock(&mutex);     // lock mutex
    if (data == NBUF){
      printf ("producer %lu: all bufs FULL: wait\n", me);
      pthread_cond_wait(&emptyBuf, &mutex); // wait
    }
    buf[head++] = i+1;              // item = 1,2,..,N
    head %= NBUF;                   // circular bufs
    data++;                         // inc data by 1
    printf("producer %lu: data=%d value=%d\n", me, data, i+1);
    pthread_mutex_unlock(&mutex);   // unlock mutex
    pthread_cond_signal(&fullBuf);  // unblock a consumer, if any
  }
  printf("producer %lu: exit\n", me);
}/*end producer()*/

void *consumer()
{
  int i, c;
  pthread_t me = pthread_self();
  for (i=0; i<N; i++) {
    pthread_mutex_lock(&mutex);            // lock mutex
    if (data == 0) {
      printf ("consumer %lu: all bufs EMPTY: wait\n", me);
      pthread_cond_wait(&fullBuf, &mutex); // wait
    }
    c = buf[tail++];                       // get an item
    tail %= NBUF;
    data--;                                // dec data by 1
    printf("consumer %lu: value=%d\n", me, c);
    pthread_mutex_unlock(&mutex);          // unlock mutex
    pthread_cond_signal(&emptyBuf);        // unblock a producer, if any
  }
  printf("consumer %lu: exit\n", me);
}/*end consumer()*/

int main ()
{
  pthread_t pro, con;
  init();
  printf("main: create producer and consumer threads\n");
  pthread_create(&pro, NULL, producer, NULL);
  pthread_create(&con, NULL, consumer, NULL);
  printf("main: join with threads\n");
  pthread_join(pro, NULL);
  pthread_join(con, NULL);
  printf("main: exit\n");
}/*end main()*/
```

#### Semáforos
Un semáforo es mecanismo general para sincronizar procesos. Tiene un contador y una cola:

```c
struct sem{
    int value;              //valor del contador
    struct process *queue   //cola de procesos
}s;
```

Para que el semáforo funcione, necesita ser iniciado con un valor inicial de contador y una cola de espera vacía. Los semáforos sólo pueden ser operados por una entidad de ejecución a la vez, es decir, en una *región crítica*. Además, sus procesos deben ser *indivisibles* y *primitivos*.

Las operaciones principales de los semáforos son `P()` y `V()`:

```c
void P(sem *s) {
    s.value -= 1;
    if (s.value < 0)
        BLOCK(s);
}

void V(sem *s) {
    s.value += 1;
    if (s.value <= 0)
        SIGNAL(s);
}
```

Donde `BLOCK(s)` bloquea el proceso que llama y lo coloca en la cola de espera del semáforo y `SIGNAL(s)` desbloquea un proceso de la cola de espera del semáforo.

> Los semáforos a diferencia de las [variables de condición](#variables-de-condición), manipulan el contador para tomar decisiones, en las variables de condición se requiere un mutex lock. El semáforo con valor inicial de 1, puede ser utilizado como lock y los de otros valores para cooperación. Entonces los semáforos son **más versátiles**.

`PThread` en sus nuevas versiones soporta semáforos `POSIX 1003.1b`, con las siguientes funciones:

* `int sem_init(sem,value)`: Inicializar `sem` con valor inicial `value`
* `int sem_wait(sem)`: Similar a `P(sem)`
* `int sem_post(sem)`: Similar a `V(sem)`

Implementando este semáforo para resolver el problema anterior, se tiene lo siguiente:

```c
/* producer_consumer_semaphores.c: producer-consumer by threads 2 with semaphores */
/** * REF: Systems Programming in Unix/Linux, K.C. Wang, editorial
 * Springer Nature, 2018. Chapter 4 Concurrent Programming.
 * ISBN: 978-3-319-92428-1 ISBN: 978-3-319-92429-8 (eBook) and
 * Sistemas Operativos Diseho e ImplementaciOn, Andrew S. Tanenbaum,
 * Albert S. Whoodhull, editorial Prentice Hall, 1998. Chapter 2
 * Procesos, page 66.
 * gcc prod_cons_with_semaphores.c -pthread
 * 0 bien, gcc -lpthread -lrt prod_cons_with_semaphores.c 12
 */


#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <assert.h>

#define NBUF 5
#define N 10

// shared global variables
int buf[NBUF];                      // circular buffers
int head, tail;                     // indices
int data;                           // number of full buffers
sem_t sem_mutex,sem_empty,sem_full; // semaphores


int init()
{
    head = tail = data = 0;
    sem_init(&sem_mutex,0,1);
    sem_init(&sem_empty,0,NBUF);
    sem_init(&sem_full,0,0);
}

void *producer()
{
    int i;
    pthread_t me = pthread_self();
    for (i=0; i<N; i++){	        // try to put N items into buf[ ]
        if (data == NBUF){
            printf ("producer %lu: all bufs FULL: wait\n", me);
        }
        sem_wait(&sem_empty);
        sem_wait(&sem_mutex);
        buf[head++] = i+1;	        // item = 1,2,..,N
        head %= NBUF;	            // circular bufs
        data++;	                    // inc data by 1
        printf("producer %lu: data=%d value.%d\n", me, data, i+1);
        sem_post(&sem_mutex);
        sem_post(&sem_full);
    }
    printf("producer %lu: exit\n", me);
}/*end producer()*/

void *consumer()
{
    int i, c;
    pthread_t me = pthread_self();
    for (i=0; i<N; i++) {
        if (data == 0) {
            printf ("consumer %lu: all bufs EMPTY: wait\n", me);
        }
        sem_wait(&sem_full);
        sem_wait(&sem_mutex);
        c = buf[tail++];	        // get an item
        tail %= NBUF;
        data--;	                    // dec data by 1
        printf("consumer %lu: yalue.%d\n", me, c);
        sem_post(&sem_mutex);
        sem_post(&sem_empty);
    }
    printf("consumer %lu: exit\n", me);
}/*end consumer()*/

int main ()
{
    pthread_t pro, con;
    init();
    printf("main: create producer and consumer threads\n");
    pthread_create(&pro, NULL, producer, NULL);
    pthread_create(&con, NULL, consumer, NULL);
    printf("main: join with threads\n");
    pthread_join(pro, NULL);
    pthread_join(con, NULL);
    sem_destroy(&sem_mutex);
    sem_destroy(&sem_empty);
    sem_destroy(&sem_full);
    printf("main: exit\n");
}/*end main()*/
```

#### Barreras
Cuando se hace la operación `join`, se **espera** a que los **hilos hijos terminen** para que el **principal continue**. Esto comúnmente se utiliza para **crear nuevos hilos** que **continúen** con la **siguiente etapa** del proceso. En ese caso, a veces **es más eficiente** continuar con los **mismos hilos hijos**, para no tener que crear nuevos.

Para implementar eso, se tienen varios mecanismos, pero el que utiliza `PThreads` es el **mecanismo de barrera**. Donde los hilos **hijos** llaman a una función de **espera** de barrera en **algún punto** de su ejecución y cuando el **número especificado** de hilos **llega**, **todos continúan** con su ejecución de nuevo.

En `PThread` se implementa de la siguiente forma:

1. `pthread_barrier_t`: Objeto barrera

    ```c
    pthread_barrier_t barrier;
    ```
    
2. Inicialización del objeto barrera:

    ```c
    pthread_barrier_init(&barrier, NULL, nthreads);
    ```
    
    > Se utiliza comúnmente los atributos por defecto (pasando NULL)

3. Implementación en hilos hijos

    ```c
    ... // Código anterior a la barrera
    
    pthread_barrier_wait(&barrier)
    
    ... // Código posterior a la barrera
    ```
    
A continuación se muestra el código utilizado, implementando barreras para resolver un problema de eliminación Gaussiana.

```c
/** C4.5.c: Gauss Elimination with Partial Pivoting **/
/**
 * REF: Systems Programming in Unix/Linux, K.C. Wang, editorial 
 * Springer Nature, 2018. Chapter 4 Concurrent Programming, page 162.
 * ISBN: 978-3-319-92428-1 ISBN: 978-3-319-92429-8 (eBook).
 *
 *   gcc c4.5.c -pthread
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <pthread.h>
#include <assert.h>

#define N	4
double A[N][N+1];
pthread_barrier_t barrier;

int print_matrix()
{
  int i, j;
  printf("------------------------------------\n");
  for(i=0; i<N; i++){
    for(j=0;j<N+1;j++)
      printf("%6.2f ", A[i][j]);
    printf("\n");
  }
}/*end print_matrix()*/

void *ge(void *arg) // threads function: Gauss elimination
{
  int i, j, prow;
  int k;
  long myid=(long)arg;
  double temp, factor;
  for(i=0; i<N-1; i++){
    if (i == myid){
      printf("partial pivoting by thread %d on row %d: ", myid, i);
      temp = 0.0; prow = i;
      for (j=i; j<=N; j++){
        if (fabs(A[j][i]) > temp){
          temp = fabs(A[j][i]);
          prow = j;
        }
      }
      printf("pivot_row=%d pivot=%6.2f\n", prow, A[prow][i]);
      if (prow != i){ // swap rows
        for (j=i; j<N+1; j++){
          temp = A[i][j];
          A[i][j] = A[prow][j];
          A[prow][j] = temp;
        }
      }
    }/*if(i==myid)*/
    // wait for partial pivoting done
    pthread_barrier_wait(&barrier);
    for(j=i+1; j<N; j++){
      if (j == myid){
        printf("thread %d do row %d\n", myid, j);
        factor = A[j][i]/A[i][i];
        for (k=i+1; k<=N; k++)
          A[j][k] -= A[i][k]*factor;
        A[j][i] = 0.0;
      }
    }
    // wait for current row reductions to finish
    pthread_barrier_wait(&barrier);
    if (i == myid)
      print_matrix();
  }/*end for(i=0;)*/
}/*end ge()*/

int main(int argc, char *argv[])
{
  long i;
  int j;
  double sum;
  pthread_t threads[N];

  printf("main: initialize matrix A[N][N+1] as [A|B]\n");
  for (i=0; i<N; i++)
    for (j=0; j<N; j++)
      A[i][j] = 1.0;
  for (i=0; i<N; i++)
    A[i][N-i-1] = 1.0*N;
  for (i=0; i<N; i++){
    A[i][N] = 2.0*N - 1;
  }
  print_matrix(); // show initial matrix [A|B]

  pthread_barrier_init(&barrier, NULL, N); // set up barrier

  printf("main: create N=%d working threads\n", N);
  for (i=0; i<N; i++){
    pthread_create(&threads[i], NULL, ge, (void *)i);
  }
  printf("main: wait for all %d working threads to join\n", N);
  for (i=0; i<N; i++){
    pthread_join(threads[i], NULL);
  }
  printf("main: back substitution : ");
  for (i=N-1; i>=0; i--){
    sum = 0.0;
    for (j=i+1; j<N; j++)
      sum += A[i][j]*A[j][N];
    A[i][N] = (A[i][N]- sum)/A[i][i];
  }
  // print solution
  printf("The solution is :\n");
  for(i=0; i<N; i++){
    printf("%6.2f ", A[i][N]);
  }
  printf("\n");
}/*end main()*/
```

## Hilos en Linux
En linux, los hilos no son más que procesos que comparten recursos. Ambos, hilos y procesos son creados por medio de la llamada a sistema `clone()`:

```c
int clone (int (*fn)(void *), void *child_stack, int flags, void *arg)
```

Es como una función de creación de hilos. Crea un proceso hijo para ejecutar una función `fn(arg)` con un `child_stack`. `flags` especifíca cómo los recursos serán compartidos entre el padre y el hijo como uno de los siguientes:

* `CLONE_VM`: Hijo y padre comparten el mismo espacio de memoria
* `CLONE_FS`: Hijo y padre comparten la misma información de sistema de archivos (root, CWD, etc.)
* `CLONE_FILES`: Hijo y padre comparten archivos abiertos
* `CLONE_SIGHAND`: Hijo y padre comparten handlers de señal y señales bloqueadas

> Para cualquiera de las banderas, los procesos padre e hijo comparten **exactamente** el mismo recurso, no una copia de él.

> Si no se especifica ningúna bandera, el proceso hijo recibe una copia separada del recurso. O sea que los cambios hechos no se veran afectados en el otro recurso.

El campo `arg` son los argumentos a la función `fn`.

El kernel Linux tiene `fork` como un wrapper de `clone` en forma de llamada a sistema. Así, el kernel se encarga de especificar las banderas apropiadas.
