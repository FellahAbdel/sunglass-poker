module.exports = (app, dao, gameController) => {
  app.get("/rooms", (req, res) => {
    var roomsInfos = [];
    for (var room in gameController.rooms) {
      r = gameController.rooms[room];
      console.log(room);
      roomsInfos.push({
        ...r,
        refresh: r.refresh !== undefined ? true : false,
      });
    }
    res.send(roomsInfos);
  });

  app.post("/api/users", async (req, res) => {
    const answer = await dao.CreateUser(req.body);
    res.status(answer.code).json(answer.data);
  });
  app.post("/api/login", async (req, res) => {
    const answer = await dao.LoginUser(req.body);
    if (answer.user) {
      req.session.user = answer.user;
      console.log(req.session.user);
      req.session.save();
    }
    res.status(answer.code).json(answer.data);
  });
  app.post("/api/check-email", async (req, res) => {
    const answer = await dao.checkEmail(req.body);
    res.status(answer.code).json(answer.data);
  });
  app.put("/api/update-user-data", async (req, res) => {
    const answer = await dao.updateUserData(req.body);
    res.status(answer.code).json(answer.data);
  });

  app.get("/api/userInfo", async (req, res) => {
    console.log("userInfo session : ", req.session);
    // Supposons que le token soit envoyé en tant que "Bearer <token>"
    const token = req.headers.authorization.split(" ")[1];
    answer = await dao.userInfo(token);
    res.status(answer.code).json(answer.data);
  });

  app.get("/api/user-stats/:userId", async (req, res) => {
    const userId = req.params.userId;
    answer = await dao.userStat(userId);
    res.status(answer.code).json(answer.data);
  });

  // Route to handle the creation of games
  app.post("/api/games", async (req, res) => {
    try {
      // Extract game data from the request body
      const { serverName, password, rank } = req.body;

      // Call the createGameDescription function from dao
      const result = await dao.createGameDescription(
        serverName,
        password,
        rank
      );

      // Check if there was an error during game creation
      if (result.error) {
        // Send an error response
        return res.status(result.code).json(result.data);
      }

      // Send a success response with the created game description
      res.status(result.code).json(result.data);
    } catch (error) {
      // Handle unexpected errors
      console.error("Error creating game:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
