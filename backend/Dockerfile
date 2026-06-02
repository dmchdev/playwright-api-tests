FROM python:3.12-alpine

ENV FLASK_APP=app.py  # Sets environment variables used by the `flask` command
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers 
COPY requirements.txt /
COPY endpoints.py /
COPY healthchecks.py /
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["flask", "--app", "endpoints", "run"]
