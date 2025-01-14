FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src

# Copy the project file and restore dependencies
COPY ["*.csproj", "Shortener-LinkAPI/"]
RUN dotnet restore 'Shortener-LinkAPI/Shortener-LinkAPI.csproj'

# Copy the rest of the code and build the application
COPY [".", "Shortener-LinkAPI/"]
RUN dotnet build 'Shortener-LinkAPI/Shortener-LinkAPI.csproj' -c Release -o /app/build

# Publish the application

FROM build AS publish
RUN dotnet publish 'Shortener-LinkAPI/Shortener-LinkAPI.csproj' -c Release -o /app/publish

# Use the official .NET 7.0 runtime image as the base
FROM mcr.microsoft.com/dotnet/aspnet:7.0

# Set the working directory to /app
WORKDIR /app

ENV ASPNETCORE_HTTP_PORTS="5107"
ENV ASPNETCORE_URLS="http://+:${ASPNETCORE_HTTP_PORTS}"
# Expose the port
EXPOSE 5107

# Copy the published application
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "Shortener-LinkAPI.dll" ]