import { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'cpp-basics',
    title: 'C++ Basics',
    description: 'Learn the fundamentals of C++ programming language and programming concepts.',
    difficulty: 'Beginner',
    topics: ['Background of Programming', 'C++ Introduction', 'First C++ Program'],
    xpReward: 50,
    estimatedTime: 20,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'variables-data-types',
    title: 'Variables and Data Types',
    description: 'Master variable declaration and different data types in C++.',
    difficulty: 'Beginner',
    topics: ['Variables', 'Data Types', 'Static/Const/Auto'],
    xpReward: 50,
    estimatedTime: 25,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'operators',
    title: 'Operators',
    description: 'Learn about various operators and their precedence in C++.',
    difficulty: 'Beginner',
    topics: ['Arithmetic', 'Comparison', 'Logical', 'Bitwise', 'Precedence'],
    xpReward: 75,
    estimatedTime: 30,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'flow-control',
    title: 'Flow Control',
    description: 'Control program execution with conditional statements and loops.',
    difficulty: 'Beginner',
    topics: ['If-Else', 'Nested If-Else', 'Switch', 'Problem Solving'],
    xpReward: 75,
    estimatedTime: 35,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Create reusable code blocks with functions and advanced function features.',
    difficulty: 'Intermediate',
    topics: ['Declaration/Definition', 'Default Arguments', 'Inline/Overloading'],
    xpReward: 100,
    estimatedTime: 40,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'loops',
    title: 'Loops',
    description: 'Master different types of loops and control flow statements.',
    difficulty: 'Intermediate',
    topics: ['While', 'For', 'Do While', 'Nested', 'Break/Continue'],
    xpReward: 100,
    estimatedTime: 35,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'pointers',
    title: 'Pointers',
    description: 'Understand memory management and pointer concepts in C++.',
    difficulty: 'Advanced',
    topics: ['Introduction', 'Function Parameters', 'NULL', 'Dynamic Memory'],
    xpReward: 150,
    estimatedTime: 50,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    description: 'Master comprehensive OOP concepts including classes, objects, encapsulation, inheritance, polymorphism, and abstraction in C++.',
    difficulty: 'Advanced',
    topics: ['Class & Object', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'Constructor & Destructor', 'Methods & Attributes'],
    xpReward: 150,
    estimatedTime: 55,
    isCompleted: false,
    progress: 0
  }
];

// Module content data
export const moduleContent: Record<string, {
  introduction: string;
  examples: Array<{ title: string; description: string; code: string }>;
  uses: Array<{ title: string; description: string }>;
}> = {
  'cpp-basics': {
    introduction: 'C++ is a powerful general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language. It offers a perfect blend of high-level and low-level programming features, making it ideal for system programming, game development, and applications requiring high performance.',
    examples: [
      {
        title: 'Hello World Program',
        description: 'The traditional first program that prints "Hello, World!" to the console.',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
      },
      {
        title: 'Basic Input/Output',
        description: 'Demonstrates how to get user input and display output.',
        code: `#include <iostream>
using namespace std;

int main() {
    string name;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Hello, " << name << "!" << endl;
    return 0;
}`
      }
    ],
    uses: [
      {
        title: 'System Programming',
        description: 'Operating systems, device drivers, and embedded systems'
      },
      {
        title: 'Game Development',
        description: 'High-performance games and graphics applications'
      },
      {
        title: 'Application Software',
        description: 'Desktop applications, productivity software, and tools'
      }
    ]
  },
  'variables-data-types': {
    introduction: 'Variables and Data Types are fundamental building blocks of C++ programming. Understanding these concepts is essential for effective programming and memory management.',
    examples: [
      {
        title: '1. Variables in C++',
        description: 'A variable is a named storage location in memory that holds a value which can change during program execution. It acts like a container to store data. You must declare a variable before using it, specifying its data type.',
        code: `// Variable declaration and initialization
int age = 25;                    // Integer variable
double salary = 50000.50;       // Double precision variable
char grade = 'A';               // Character variable
bool isActive = true;           // Boolean variable
string name = "John Doe";       // String variable

// Using variables
cout << "Name: " << name << endl;
cout << "Age: " << age << endl;
cout << "Salary: $" << salary << endl;`
      },
      {
        title: '2. Basic Data Types',
        description: 'A data type defines the kind of data a variable can hold. C++ provides several built-in basic data types.',
        code: `// Basic Data Types Examples
int number = 42;               // integers (whole numbers)
float price = 19.99f;          // decimal numbers (single precision)
double pi = 3.14159265359;     // decimal numbers (double precision)
char letter = 'A';             // single character ('A', '9')
bool isTrue = true;            // Boolean values (true / false)
// void → represents no value (used in functions)

cout << "Integer: " << number << endl;
cout << "Float: " << price << endl;
cout << "Double: " << pi << endl;
cout << "Character: " << letter << endl;
cout << "Boolean: " << isTrue << endl;`
      },
      {
        title: '3. Derived Data Types',
        description: 'Data types that are built from basic data types to create more complex structures.',
        code: `// Arrays
int numbers[5] = {1, 2, 3, 4, 5};

// Pointers
int value = 100;
int* ptr = &value;              // Pointer to integer

// References
int original = 50;
int& ref = original;            // Reference to integer

// Function type
int add(int a, int b) {         // Function returning int
    return a + b;
}

cout << "Array element: " << numbers[0] << endl;
cout << "Pointer value: " << *ptr << endl;
cout << "Reference value: " << ref << endl;`
      },
      {
        title: '4. User-defined Data Types',
        description: 'Custom data types created by programmers to model real-world entities and complex data structures.',
        code: `// Structure
struct Point {
    int x, y;
};

// Class
class Rectangle {
private:
    double length, width;
public:
    Rectangle(double l, double w) : length(l), width(w) {}
    double area() { return length * width; }
};

// Enumeration
enum Color { RED, GREEN, BLUE };

// Usage
Point p = {10, 20};
Rectangle rect(5.0, 3.0);
Color myColor = RED;

cout << "Point: (" << p.x << ", " << p.y << ")" << endl;
cout << "Rectangle area: " << rect.area() << endl;`
      }
    ],
    uses: [
      {
        title: 'Data Storage',
        description: 'Storing user input, calculations, and program state'
      },
      {
        title: 'Configuration',
        description: 'Defining constants and settings for applications'
      },
      {
        title: 'Memory Management',
        description: 'Efficient use of memory with appropriate data types'
      }
    ]
  },
  'operators': {
    introduction: 'Operators are special symbols that tell the compiler to perform specific operations on variables and values. They act on operands (variables or constants) to produce a result.',
    examples: [
      {
        title: '1. Arithmetic Operators',
        description: 'Arithmetic operators are used to perform basic mathematical operations: + Addition, - Subtraction, * Multiplication, / Division, % Modulus (remainder).',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;

    cout << "Addition: " << (a + b) << endl;
    cout << "Subtraction: " << (a - b) << endl;
    cout << "Multiplication: " << (a * b) << endl;
    cout << "Division: " << (a / b) << endl;     // integer division
    cout << "Modulus: " << (a % b) << endl;     // remainder

    return 0;
}`
      },
      {
        title: '2. Comparison Operators',
        description: 'Comparison operators are used to compare two values. They return either true (1) or false (0): == Equal to, != Not equal to, > Greater than, < Less than, >= Greater or equal, <= Less or equal.',
        code: `#include <iostream>
using namespace std;

int main() {
    int x = 5, y = 10;

    cout << (x == y) << endl;  // 0 (false)
    cout << (x != y) << endl;  // 1 (true)
    cout << (x > y) << endl;   // 0
    cout << (x < y) << endl;   // 1
    cout << (x >= 5) << endl;  // 1
    cout << (y <= 5) << endl;  // 0

    return 0;
}`
      },
      {
        title: '3. Logical Operators',
        description: 'Logical operators are used to combine conditions: && (AND) → true if both conditions are true, || (OR) → true if at least one condition is true, ! (NOT) → reverses result (true → false).',
        code: `#include <iostream>
using namespace std;

int main() {
    int age = 20;
    bool hasID = true;

    if (age >= 18 && hasID) {
        cout << "Allowed to enter" << endl;
    }

    if (age < 18 || !hasID) {
        cout << "Not allowed to enter" << endl;
    }

    return 0;
}`
      },
      {
        title: '4. Bitwise Operators',
        description: 'Bitwise operators work on bits (0s and 1s) of numbers: & (AND), | (OR), ^ (XOR), ~ (NOT), << (Left Shift), >> (Right Shift).',
        code: `#include <iostream>
using namespace std;

int main() {
    int a = 5;  // 0101 in binary
    int b = 3;  // 0011 in binary

    cout << (a & b) << endl;  // 1 (0001)
    cout << (a | b) << endl;  // 7 (0111)
    cout << (a ^ b) << endl;  // 6 (0110)
    cout << (~a) << endl;     // -6 (2's complement)
    cout << (a << 1) << endl; // 10 (shift left)
    cout << (a >> 1) << endl; // 2 (shift right)

    return 0;
}`
      },
      {
        title: '5. Operator Precedence',
        description: 'When multiple operators appear, precedence decides which executes first. Example: * and / have higher precedence than + and -. Use () parentheses to change the order.',
        code: `#include <iostream>
using namespace std;

int main() {
    int result = 10 + 5 * 2;   // Multiplication happens first → 10 + 10 = 20
    int result2 = (10 + 5) * 2; // Parentheses change order → 15 * 2 = 30

    cout << "Result without (): " << result << endl;
    cout << "Result with (): " << result2 << endl;

    return 0;
}`
      }
    ],
    uses: [
      {
        title: 'Mathematical Calculations',
        description: 'Performing arithmetic operations and computations'
      },
      {
        title: 'Conditional Logic',
        description: 'Making decisions based on value comparisons'
      },
      {
        title: 'Bit Manipulation',
        description: 'Low-level operations for performance optimization'
      }
    ]
  },
  'flow-control': {
    introduction: 'Flow control statements allow you to control the execution of your program based on conditions. They help make decisions and execute different code blocks depending on various scenarios.',
    examples: [
      {
        title: '1. If-Else',
        description: 'The if-else statement is used to make decisions in a program. If a condition is true → one block of code runs. Else → another block runs.',
        code: `#include <iostream>
using namespace std;

int main() {
    int age = 18;

    if (age >= 18) {
        cout << "You are eligible to vote.";
    } else {
        cout << "You are not eligible to vote.";
    }

    return 0;
}`
      },
      {
        title: '2. Nested If-Else',
        description: 'When one if-else statement is inside another, it\'s called a nested if-else. Used when we need to check multiple conditions step by step.',
        code: `#include <iostream>
using namespace std;

int main() {
    int marks = 85;

    if (marks >= 90) {
        cout << "Grade: A";
    } else if (marks >= 75) {
        cout << "Grade: B";
    } else if (marks >= 50) {
        cout << "Grade: C";
    } else {
        cout << "Fail";
    }

    return 0;
}`
      },
      {
        title: '3. Switch',
        description: 'The switch statement is used when we want to select one option from many choices. It\'s simpler than writing multiple if-else for fixed values.',
        code: `#include <iostream>
using namespace std;

int main() {
    int day = 3;

    switch (day) {
        case 1: cout << "Monday"; break;
        case 2: cout << "Tuesday"; break;
        case 3: cout << "Wednesday"; break;
        case 4: cout << "Thursday"; break;
        case 5: cout << "Friday"; break;
        case 6: cout << "Saturday"; break;
        case 7: cout << "Sunday"; break;
        default: cout << "Invalid day";
    }

    return 0;
}`
      },
      {
        title: '4. Problem Solving (using if-else / switch)',
        description: 'Problem solving in C++ means breaking a problem into smaller steps and using conditions (if-else/switch) to find solutions.',
        code: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cout << "Enter three numbers: ";
    cin >> a >> b >> c;

    if (a >= b && a >= c) {
        cout << "Largest is: " << a;
    } else if (b >= a && b >= c) {
        cout << "Largest is: " << b;
    } else {
        cout << "Largest is: " << c;
    }

    return 0;
}`
      }
    ],
    uses: [
      {
        title: 'Decision Making',
        description: 'Executing different code paths based on conditions'
      },
      {
        title: 'Input Validation',
        description: 'Checking user input and data validity'
      },
      {
        title: 'Menu Systems',
        description: 'Creating interactive user interfaces and navigation'
      }
    ]
  },
  'functions': {
    introduction: 'Functions are reusable blocks of code that perform specific tasks. They help organize code, reduce duplication, and make programs more modular. C++ supports function overloading, default arguments, and inline functions for optimization.',
    examples: [
      {
        title: 'Function Definition',
        description: 'Creating and calling functions with parameters.',
        code: `int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b = 1) {  // Default argument
    return a * b;
}

int main() {
    int result1 = add(5, 3);      // 8
    int result2 = multiply(4);    // 4 (uses default)
    int result3 = multiply(4, 5); // 20
    return 0;
}`
      },
      {
        title: 'Function Overloading',
        description: 'Multiple functions with the same name but different parameters.',
        code: `int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

string add(string a, string b) {
    return a + b;
}`
      }
    ],
    uses: [
      {
        title: 'Code Organization',
        description: 'Breaking complex programs into manageable pieces'
      },
      {
        title: 'Reusability',
        description: 'Writing code once and using it multiple times'
      },
      {
        title: 'Maintenance',
        description: 'Easier debugging and updating of specific functionality'
      }
    ]
  },
  'loops': {
    introduction: 'Loops let us repeat a block of code multiple times under a certain condition. C++ provides several loop types: while, for, and do-while. These can also be nested (a loop inside another loop).',
    examples: [
      {
        title: '1. While Loop',
        description: 'A while loop repeatedly executes its block of code as long as a given condition is true. It is an entry-controlled loop (the condition is checked before each iteration) and is often used when you don\'t know in advance how many times the loop should run.',
        code: `#include <iostream>
using namespace std;

int main() {
    // Example: Print numbers 1 to 5 using a while loop
    int i = 1;              // initialize counter to 1
    while (i <= 5) {        // loop condition: continue while i is at most 5
        cout << i << "\\n";  // print the current value of i
        i++;                // increment i by 1
    }
    return 0;
}

// How It Works: The loop starts with i = 1. Each time through the loop it prints i, 
// then increments i. Once i becomes 6, the condition i <= 5 is false and the loop stops. 
// This program prints the numbers 1 through 5.`
      },
      {
        title: '2. For Loop',
        description: 'A for loop is designed to repeat a block of code a specific number of times. Its syntax combines three parts in one line: initialization, condition, and update. It\'s especially useful when you know beforehand how many times you want to loop.',
        code: `#include <iostream>
using namespace std;

int main() {
    // Example: Print numbers 1 to 5 using a for loop
    for (int i = 1; i <= 5; i++) {  // i starts at 1, loop runs while i<=5, then i increases each time
        cout << i << "\\n";         // print current value of i
    }
    return 0;
}

// How It Works: In this loop, i is initialized to 1. Before each iteration, it checks i <= 5. 
// It prints i and then the i++ in the loop header increments i. The loop runs for i = 1,2,3,4,5, 
// printing those numbers. When i becomes 6, the loop ends. The output is 1 2 3 4 5.`
      },
      {
        title: '3. Do-While Loop',
        description: 'A do-while loop is like a while loop, but its condition is checked after the loop body. This guarantees that the loop body runs at least once. It is useful when you want the loop to run first and then repeat based on a condition.',
        code: `#include <iostream>
using namespace std;

int main() {
    // Example: Print numbers 1 to 5 using a do-while loop
    int i = 1;              // initialize counter to 1
    do {
        cout << i << "\\n";  // print current value of i
        i++;                // increment i by 1
    } while (i <= 5);       // check condition after loop body
    return 0;
}

// How It Works: The code inside do { … } runs once with i = 1, printing 1. 
// Then it checks i <= 5; since i is now 2, it repeats. It continues printing and 
// incrementing until i becomes 6. At that point i <= 5 is false and the loop stops.`
      },
      {
        title: '4. Nested Loops',
        description: 'A nested loop is simply a loop inside another loop. The inner loop runs completely for each single iteration of the outer loop. This is useful for working with tables, grids, or multi-dimensional data.',
        code: `#include <iostream>
using namespace std;

int main() {
    // Example: Nested loops printing pairs (i, j)
    for (int i = 1; i <= 3; i++) {       // outer loop: i = 1, 2, 3
        for (int j = 1; j <= 2; j++) {   // inner loop: j = 1, 2
            cout << "i=" << i << ", j=" << j << "\\n";
            // This line runs 3*2 = 6 times in total
        }
    }
    return 0;
}`
      },
      {
        title: '5. Break and Continue',
        description: 'Break immediately exits the nearest enclosing loop. Continue skips the rest of the current loop iteration and jumps to the next iteration.',
        code: `#include <iostream>
using namespace std;

int main() {
    // Break Example: Break out of loop when i reaches 5
    cout << "Break example: ";
    for (int i = 1; i <= 10; i++) {
        if (i == 5) {
            break;               // exit the loop when i is 5
        }
        cout << i << " ";      // prints 1,2,3,4 then stops
    }
    
    cout << "\\nContinue example: ";
    // Continue Example: Skip even numbers using continue
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            continue;            // skip the rest of this loop iteration for even i
        }
        cout << i << " ";      // prints only odd numbers: 1, 3, 5
    }
    
    return 0;
}`
      }
    ],
    uses: [
      {
        title: 'Data Processing',
        description: 'Iterating through arrays, lists, and collections'
      },
      {
        title: 'User Input Validation',
        description: 'Repeating input prompts until valid data is received'
      },
      {
        title: 'Simulations',
        description: 'Running calculations and algorithms multiple times'
      }
    ]
  },
  'pointers': {
    introduction: 'Pointers are variables that store memory addresses of other variables. They are fundamental to C++ and provide direct access to memory, enabling dynamic memory allocation, efficient parameter passing, and low-level programming capabilities.',
    examples: [
      {
        title: 'Basic Pointers',
        description: 'Declaring and using pointers to access values.',
        code: `int number = 42;
int* ptr = &number;     // ptr stores address of number

cout << "Value: " << number << endl;    // 42
cout << "Address: " << ptr << endl;     // Memory address
cout << "Value via pointer: " << *ptr << endl;  // 42

*ptr = 100;             // Change value through pointer
cout << "New value: " << number << endl;  // 100`
      },
      {
        title: 'Dynamic Memory',
        description: 'Allocating and deallocating memory at runtime.',
        code: `// Allocate memory
int* dynamicArray = new int[5];

// Initialize array
for (int i = 0; i < 5; i++) {
    dynamicArray[i] = i + 1;
}

// Use array
for (int i = 0; i < 5; i++) {
    cout << dynamicArray[i] << " ";
}

// Deallocate memory
delete[] dynamicArray;
dynamicArray = nullptr;  // Good practice`
      }
    ],
    uses: [
      {
        title: 'Dynamic Memory Management',
        description: 'Allocating memory at runtime for flexible data structures'
      },
      {
        title: 'Efficient Parameter Passing',
        description: 'Passing large objects by reference to avoid copying'
      },
      {
        title: 'Data Structures',
        description: 'Building linked lists, trees, and other complex structures'
      }
    ]
  },
  'oop': {
    introduction: 'Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects containing data and code. C++ supports comprehensive OOP concepts that enable building robust, maintainable, and scalable software systems.',
    examples: [
      {
        title: '1. Class & Object',
        description: 'Class is a blueprint for objects. Object is an instance of a class representing real-world entities.',
        code: `class Car {
private:
    string brand;
    int year;

public:
    Car(string b, int y) : brand(b), year(y) {}
    void displayInfo() {
        cout << "Brand: " << brand << ", Year: " << year << endl;
    }
};

int main() {
    Car myCar("Toyota", 2023);  // Object creation
    myCar.displayInfo();
    return 0;
}`
      },
      {
        title: '2. Encapsulation',
        description: 'Binding data & methods together, controlling access with public, private, protected keywords.',
        code: `class BankAccount {
private:
    double balance;  // Private data

public:
    BankAccount(double initial) : balance(initial) {}
    
    // Public methods to access private data
    void deposit(double amount) {
        if(amount > 0) balance += amount;
    }
    
    double getBalance() { return balance; }
};`
      },
      {
        title: '3. Inheritance',
        description: 'Reuse properties/behaviors from base class. Types: Single, Multiple, Multilevel, Hierarchical, Hybrid.',
        code: `class Animal {  // Base class
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    virtual void sound() { cout << "Animal sound" << endl; }
};

class Dog : public Animal {  // Derived class
public:
    Dog(string n) : Animal(n) {}
    void sound() override { cout << name << " barks!" << endl; }
};`
      },
      {
        title: '4. Polymorphism',
        description: 'Compile-time (function overloading) & Run-time (virtual functions) polymorphism.',
        code: `class Shape {
public:
    virtual double area() = 0;  // Pure virtual function
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override { return 3.14 * radius * radius; }
};

class Rectangle : public Shape {
private:
    double length, width;
public:
    Rectangle(double l, double w) : length(l), width(w) {}
    double area() override { return length * width; }
};`
      },
      {
        title: '5. Abstraction',
        description: 'Show only essential features, hide implementation details using abstract classes & pure virtual functions.',
        code: `abstract class Vehicle {  // Abstract class
protected:
    string model;
public:
    Vehicle(string m) : model(m) {}
    virtual void start() = 0;  // Pure virtual function
    virtual void stop() = 0;   // Pure virtual function
    
    void displayModel() {  // Concrete method
        cout << "Model: " << model << endl;
    }
};

class Bike : public Vehicle {
public:
    Bike(string m) : Vehicle(m) {}
    void start() override { cout << "Bike started with kick!" << endl; }
    void stop() override { cout << "Bike stopped!" << endl; }
};`
      },
      {
        title: '6. Constructor & Destructor',
        description: 'Constructor initializes objects (default, parameterized, copy). Destructor releases resources.',
        code: `class Student {
private:
    string* name;
    int age;

public:
    // Default constructor
    Student() : name(new string("Unknown")), age(0) {}
    
    // Parameterized constructor
    Student(string n, int a) : name(new string(n)), age(a) {}
    
    // Copy constructor
    Student(const Student& other) : name(new string(*other.name)), age(other.age) {}
    
    // Destructor
    ~Student() {
        delete name;  // Release memory
        cout << "Student object destroyed" << endl;
    }
    
    void display() { cout << *name << ", Age: " << age << endl; }
};`
      },
      {
        title: '7. Methods & Attributes',
        description: 'Methods are functions defined inside a class. Attributes are variables that store object-specific data.',
        code: `class Rectangle {
private:
    double length, width;  // Attributes (Data Members)

public:
    // Constructor method
    Rectangle(double l, double w) : length(l), width(w) {}
    
    // Method to calculate area
    double calculateArea() {
        return length * width;
    }
    
    // Method to calculate perimeter
    double calculatePerimeter() {
        return 2 * (length + width);
    }
    
    // Getter methods
    double getLength() { return length; }
    double getWidth() { return width; }
    
    // Setter methods
    void setLength(double l) { if(l > 0) length = l; }
    void setWidth(double w) { if(w > 0) width = w; }
};`
      }
    ],
    uses: [
      {
        title: 'Software Architecture',
        description: 'Designing modular and maintainable software systems'
      },
      {
        title: 'Code Reuse',
        description: 'Inheriting functionality from existing classes'
      },
      {
        title: 'Real-world Modeling',
        description: 'Representing real-world entities and relationships'
      }
    ]
  }
};
