import threading
import time

from django.utils import timezone
from schedule import Scheduler

from .models import UsedRefreshTokens


def run_continuously(self, interval=1):
    """Continuously run, while executing pending jobs at each elapsed
    time interval.
    @return cease_continuous_run: threading.Event which can be set to
    cease continuous run.
    Please note that it is *intended behavior that run_continuously()
    does not run missed jobs*. For example, if you've registered a job
    that should run every minute and you set a continuous run interval
    of one hour then your job won't be run 60 times at each interval but
    only once.
    """

    cease_continuous_run = threading.Event()

    class ScheduleThread(threading.Thread):

        @classmethod
        def run(cls):
            while not cease_continuous_run.is_set():
                self.run_pending()
                time.sleep(interval)

    continuous_thread = ScheduleThread()
    continuous_thread.setDaemon(True)
    continuous_thread.start()
    return cease_continuous_run


Scheduler.run_continuously = run_continuously


def removeExpiredTokens():
    now = timezone.now()
    expiredTokens = UsedRefreshTokens.objects.filter(expires_at__lt=now)
    expiredTokens.delete()


def start_scheduler():
    scheduler = Scheduler()
    scheduler.every(10).minutes.do(removeExpiredTokens)
    scheduler.run_continuously()
