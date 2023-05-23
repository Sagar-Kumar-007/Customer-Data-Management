IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE TABLE [Coordinates] (
        [coordinateId] int NOT NULL IDENTITY,
        [latitude] float NOT NULL,
        [longitude] float NOT NULL,
        [address] nvarchar(max) NULL,
        CONSTRAINT [PK_Coordinates] PRIMARY KEY ([coordinateId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE TABLE [Logs] (
        [logId] int NOT NULL IDENTITY,
        [userId] nvarchar(max) NULL,
        [timeStamp] nvarchar(max) NULL,
        [operation] nvarchar(max) NULL,
        [message] nvarchar(max) NULL,
        CONSTRAINT [PK_Logs] PRIMARY KEY ([logId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE TABLE [Users] (
        [Id] int NOT NULL IDENTITY,
        [FirstName] nvarchar(max) NULL,
        [LastName] nvarchar(max) NULL,
        [Username] nvarchar(max) NULL,
        [Password] nvarchar(max) NULL,
        [Token] nvarchar(max) NULL,
        [Role] nvarchar(max) NULL,
        [Email] nvarchar(max) NULL,
        [ResetPasswordToken] nvarchar(max) NULL,
        [ResetPasswordExpiry] datetime2 NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE TABLE [Customers] (
        [email] nvarchar(450) NOT NULL,
        [cname] nvarchar(max) NULL,
        [logo] nvarchar(max) NULL,
        [sector] nvarchar(max) NULL,
        [phoneNo] nvarchar(max) NULL,
        [coordinateId] int NOT NULL,
        [CountryCode] nvarchar(max) NULL,
        [Description] nvarchar(max) NULL,
        [Website] nvarchar(max) NULL,
        CONSTRAINT [PK_Customers] PRIMARY KEY ([email]),
        CONSTRAINT [FK_Customers_Coordinates_coordinateId] FOREIGN KEY ([coordinateId]) REFERENCES [Coordinates] ([coordinateId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE TABLE [Accounts] (
        [Acc_email] nvarchar(450) NOT NULL,
        [Acc_revenue] decimal(18,2) NOT NULL,
        [aname] nvarchar(max) NULL,
        [EstYear] nvarchar(max) NULL,
        [description] nvarchar(max) NULL,
        [coordinateId] int NOT NULL,
        [Customer_email] nvarchar(450) NULL,
        CONSTRAINT [PK_Accounts] PRIMARY KEY ([Acc_email]),
        CONSTRAINT [FK_Accounts_Coordinates_coordinateId] FOREIGN KEY ([coordinateId]) REFERENCES [Coordinates] ([coordinateId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Accounts_Customers_Customer_email] FOREIGN KEY ([Customer_email]) REFERENCES [Customers] ([email])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE INDEX [IX_Accounts_coordinateId] ON [Accounts] ([coordinateId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE INDEX [IX_Accounts_Customer_email] ON [Accounts] ([Customer_email]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    CREATE INDEX [IX_Customers_coordinateId] ON [Customers] ([coordinateId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230522162652_init')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230522162652_init', N'7.0.5');
END;
GO

COMMIT;
GO

