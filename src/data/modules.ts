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
    description: 'Learn OOP concepts including classes, inheritance, and polymorphism.',
    difficulty: 'Advanced',
    topics: ['Constructors/Destructors', 'This pointer', 'Inheritance'],
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
    introduction: 'Variables are containers for storing data values in C++. Each variable has a specific data type that determines the size and layout of the variable\'s memory, the range of values that can be stored, and the set of operations that can be applied to the variable.',
    examples: [
      {
        title: 'Variable Declaration',
        description: 'Different ways to declare and initialize variables.',
        code: `int age = 25;                    // Integer
double height = 5.9;           // Double precision float
char grade = 'A';              // Character
bool isStudent = true;         // Boolean
string name = "John Doe";      // String`
      },
      {
        title: 'Constants and Auto',
        description: 'Using const for constants and auto for type inference.',
        code: `const double PI = 3.14159;      // Constant
const int MAX_SIZE = 100;      // Constant

auto number = 42;              // Auto-deduced as int
auto text = "Hello";           // Auto-deduced as const char*
auto decimal = 3.14;           // Auto-deduced as double`
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
    introduction: 'Operators are symbols that perform operations on variables and values. C++ provides a rich set of operators including arithmetic, comparison, logical, and bitwise operators. Understanding operator precedence is crucial for writing correct expressions.',
    examples: [
      {
        title: 'Arithmetic Operators',
        description: 'Basic mathematical operations in C++.',
        code: `int a = 10, b = 3;
int sum = a + b;        // Addition: 13
int diff = a - b;       // Subtraction: 7
int product = a * b;    // Multiplication: 30
int quotient = a / b;   // Division: 3
int remainder = a % b;  // Modulus: 1`
      },
      {
        title: 'Comparison and Logical',
        description: 'Comparing values and combining conditions.',
        code: `int x = 5, y = 10;
bool isEqual = (x == y);        // false
bool isLess = (x < y);          // true
bool isGreater = (x > y);       // false

bool condition1 = true;
bool condition2 = false;
bool result = condition1 && condition2;  // false (AND)
bool result2 = condition1 || condition2; // true (OR)`
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
    introduction: 'Flow control statements allow you to control the execution of your program. They include conditional statements (if-else, switch) that execute different code blocks based on conditions, and loops that repeat code execution.',
    examples: [
      {
        title: 'If-Else Statements',
        description: 'Conditional execution based on boolean expressions.',
        code: `int score = 85;

if (score >= 90) {
    cout << "Grade: A" << endl;
} else if (score >= 80) {
    cout << "Grade: B" << endl;
} else if (score >= 70) {
    cout << "Grade: C" << endl;
} else {
    cout << "Grade: F" << endl;
}`
      },
      {
        title: 'Switch Statement',
        description: 'Multi-way branching based on a single value.',
        code: `int day = 3;
switch (day) {
    case 1:
        cout << "Monday" << endl;
        break;
    case 2:
        cout << "Tuesday" << endl;
        break;
    case 3:
        cout << "Wednesday" << endl;
        break;
    default:
        cout << "Other day" << endl;
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
    introduction: 'Loops are control structures that repeat a block of code multiple times. C++ provides three main types of loops: while, for, and do-while. Each has its own use case and syntax, and they can be nested for complex iterations.',
    examples: [
      {
        title: 'For Loop',
        description: 'Iterating a specific number of times with a counter.',
        code: `// Count from 1 to 5
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
cout << endl;

// Iterate through array
int numbers[] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) {
    cout << numbers[i] << " ";
}`
      },
      {
        title: 'While and Do-While',
        description: 'Conditional loops that continue while a condition is true.',
        code: `// While loop
int count = 0;
while (count < 5) {
    cout << count << " ";
    count++;
}

// Do-while loop (executes at least once)
int num = 1;
do {
    cout << num << " ";
    num++;
} while (num <= 5);`
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
    introduction: 'Object-Oriented Programming (OOP) is a programming paradigm that organizes code into objects containing data and code. C++ supports OOP concepts including encapsulation, inheritance, and polymorphism, making it powerful for building complex software systems.',
    examples: [
      {
        title: 'Class Definition',
        description: 'Creating a class with constructors and methods.',
        code: `class Student {
private:
    string name;
    int age;
    double gpa;

public:
    // Constructor
    Student(string n, int a, double g) {
        name = n;
        age = a;
        gpa = g;
    }
    
    // Methods
    void displayInfo() {
        cout << "Name: " << name << endl;
        cout << "Age: " << age << endl;
        cout << "GPA: " << gpa << endl;
    }
    
    double getGPA() { return gpa; }
    void setGPA(double g) { gpa = g; }
};`
      },
      {
        title: 'Inheritance',
        description: 'Creating derived classes that inherit from base classes.',
        code: `class Person {
protected:
    string name;
    int age;

public:
    Person(string n, int a) : name(n), age(a) {}
    virtual void display() {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
};

class Employee : public Person {
private:
    string department;
    double salary;

public:
    Employee(string n, int a, string dept, double sal)
        : Person(n, a), department(dept), salary(sal) {}
    
    void display() override {
        Person::display();
        cout << "Department: " << department << ", Salary: " << salary << endl;
    }
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
