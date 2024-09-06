export const prerender = false;

export const POST = async ({ request }) => {
  const body = await request.json();

  const aadhaarNumber = body.aadhaarNumber;

  const behaviourData = body.behaviourData;

  const page_views = behaviourData.page_views;
  const session_duration = behaviourData.session_duration;
  const time_on_page = behaviourData.time_on_page;
  const previous_visits = behaviourData.previous_visits;

  try {
    const response = await fetch(`http://localhost:8080/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_views,
        session_duration,
        time_on_page,
        previous_visits,
      }),
    });

    const data = await response.json();

    const isBot = data.prediction === "Bot" ? true : false;

    if (isBot) {
      return new Response(
        JSON.stringify({
          url: "/captcha?aadhaarNumber=" + aadhaarNumber,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } else {
      return new Response(
        JSON.stringify({ url: "/success?aadhaarNumber=" + aadhaarNumber }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
