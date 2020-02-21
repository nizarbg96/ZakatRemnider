package smoothalgo.repository;

import smoothalgo.domain.Zakat;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Zakat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZakatRepository extends JpaRepository<Zakat, Long> {

}
