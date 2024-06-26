# 脚手架 Command 类封装

Command 类是一个抽象命令类，基于 **模板方法模式(Template Method Pattern)** 设计模式，用于封装由 [commander](https://www.npmjs.com/package/commander) 库封装的命令的共同行为。

而具体的命令如 `CreateCommand` 则是具体的命令类，其继承自 `Command` 类。

> 脚手架命令封装的目的是为了方便管理脚手架命令，并提高代码复用性。

### 模板方法模式

模板方法模式是一种行为设计模式，父类定义业务逻辑的框架，将框架中的步骤抽象为模板方法，将具体的步骤交给子类实现或重写，每个步骤的调用由父类决定。模板方法模式可以让子类在不改变算法结构的情况下，重新定义算法中的某些步骤。对于业务逻辑的架构相似而具体实现不同的需求则可以考虑采用模板方法模式。

-   **抽象类（Abstract Class）**
    定义了算法的骨架，包括一个模板方法和若干个抽象方法。抽象方法由子类实现，而模板方法在抽象类中定义了算法的结构，包括一系列步骤。

-   **具体类（Concrete Class）**
    实现了抽象类中定义的抽象方法，完成算法中具体的细节。每个具体类可以提供不同的实现，以满足特定的需求。

Command 类定义了一个模板方法，即 register command 构造函数，其中包含了一些固定的步骤，如注册命令、设置描述等，而具体的步骤实现则由子类来完成。
